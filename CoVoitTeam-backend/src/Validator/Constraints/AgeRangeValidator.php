<?php
namespace App\Validator\Constraints;

use Symfony\Component\Validator\Constraint;
use Symfony\Component\Validator\ConstraintValidator;

class AgeRangeValidator extends ConstraintValidator
{
    public function validate($value, Constraint $constraint)
    {
        if (!$value instanceof \DateTimeInterface) {
            return;
        }

        $minDate = new \DateTime();
        $minDate->modify('-' . $constraint->minAge . ' years');

        $maxDate = new \DateTime();
        $maxDate->modify('-' . $constraint->maxAge . ' years');

        if ($value > $minDate) {
            $this->context->buildViolation($constraint->minMessage)
                ->setParameter('{{ limit }}', $constraint->minAge)
                ->addViolation();
        }

        if ($value < $maxDate) {
            $this->context->buildViolation($constraint->maxMessage)
                ->setParameter('{{ limit }}', $constraint->maxAge)
                ->addViolation();
        }
    }
}