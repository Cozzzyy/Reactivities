﻿using Application.Activities.DTOs;
using FluentValidation;

namespace Application.Activities.Validators;

public class BaseActivityValidator<T, TDto> : AbstractValidator<T> where TDto : BaseActivittyDto
{

    public BaseActivityValidator(Func<T, TDto> selector)
    {
        RuleFor(x0 => selector(x0))
            .NotNull()
            .WithMessage("Activity data must not be null.");

        RuleFor(x => selector(x).Title)
            .NotEmpty()
            .WithMessage("Title is required.")
            .MaximumLength(100)
            .WithMessage("Title must not exceed 100 characters.");

        RuleFor(x => selector(x).Description)
            .NotEmpty()
            .WithMessage("Description is required.")
            .MaximumLength(500)
            .WithMessage("Description must not exceed 500 characters.");

        RuleFor(x => selector(x).Date)
            .NotEmpty()
            .WithMessage("Date is required.")
            .GreaterThan(DateTime.UtcNow)
            .WithMessage("Date must be in the future.");
        
        RuleFor(x => selector(x).Category)
            .NotEmpty()
            .WithMessage("Category is required.")
            .MaximumLength(50)
            .WithMessage("Category must not exceed 50 characters.");
        
        RuleFor(x => selector(x).City)
            .NotEmpty()
            .WithMessage("City is required.")
            .MaximumLength(100)
            .WithMessage("City must not exceed 100 characters.");
        
        RuleFor(x => selector(x).Venue)
            .NotEmpty()
            .WithMessage("Venue is required.")
            .MaximumLength(100)
            .WithMessage("Venue must not exceed 100 characters.");
        
        RuleFor(x => selector(x).Latitude)
            .InclusiveBetween(-90, 90)
            .WithMessage("Latitude must be between -90 and 90 degrees.");
        
        RuleFor(x => selector(x).Longitude)
            .InclusiveBetween(-180, 180)
            .WithMessage("Longitude must be between -180 and 180 degrees.");
    }
    
}