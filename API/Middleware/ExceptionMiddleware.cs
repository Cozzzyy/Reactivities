using System;
using System.Text.Json;
using Application.Core;
using FluentValidation;
using Microsoft.AspNetCore.Mvc;

namespace API.Middleware;

public class ExceptionMiddleware(ILogger<Exception> logger, IHostEnvironment env) : IMiddleware
{
    public async Task InvokeAsync(HttpContext context, RequestDelegate next)
    {
        try
        {
            await next(context);
        }
        catch (ValidationException ex)
        {
            await HandleValidationException(context, ex);
        }
        catch (Exception ex)
        {
           await HandleException(context, ex);}
    }

    private async Task HandleException(HttpContext context, Exception exception)
    {
        logger.LogError(exception, exception.Message);
        context.Response.ContentType = "application/json";
        context.Response.StatusCode = StatusCodes.Status500InternalServerError;
        
        var response = env.IsDevelopment()
            ? new AppException(
                StatusCodes.Status500InternalServerError,
                exception.Message,
                exception.StackTrace)
            : new AppException(
                StatusCodes.Status500InternalServerError,
                exception.Message,
                null);

        var options = new JsonSerializerOptions();
        
        var json = JsonSerializer.Serialize(response, options);
        
        await context.Response.WriteAsync(json);
    }

    private static async Task HandleValidationException(HttpContext context, ValidationException validationException)
    {
        var validationErrors = new Dictionary<string, List<string>>();

        if (validationException.Errors is not null)
        {
            foreach (var error in validationException.Errors)
            {
                if (validationErrors.TryGetValue(error.PropertyName, out var existingErrors))
                {
                    existingErrors.Add(error.ErrorMessage);
                }
                else
                {
                    validationErrors[error.PropertyName] = new List<string> { error.ErrorMessage };
                }
            }

            context.Response.StatusCode = StatusCodes.Status400BadRequest;

            // Convert List<string> to string[]
            var errorsForProblemDetails = validationErrors.ToDictionary(
                kvp => kvp.Key,
                kvp => kvp.Value.ToArray()
            );

            var validationProblemDetails = new ValidationProblemDetails(errorsForProblemDetails)
            {
                Status = context.Response.StatusCode,
                Type = "ValidationFailure",
                Title = "Validation error",
                Detail = "One or more validation errors occurred."
            };

            await context.Response.WriteAsJsonAsync(validationProblemDetails);
        }
    }
}