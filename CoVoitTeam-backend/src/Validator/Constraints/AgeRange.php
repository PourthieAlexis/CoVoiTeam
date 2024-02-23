<?php
namespace App\Validator\Constraints;

use Symfony\Component\Validator\Constraint;
use Symfony\Component\Validator\Exception\MissingOptionsException;

#[\Attribute]
class AgeRange extends Constraint
{
    public $minAge;
    public $maxAge;
    public $minMessage = 'L\'âge doit être supérieur à {{ limit }} ans.';
    public $maxMessage = 'L\'âge doit être inférieur à {{ limit }} ans.';

    public function __construct(
        array $options = null
    ) {
        parent::__construct($options);

        if (null === $this->minAge) {
            throw new MissingOptionsException(sprintf('Option "minAge" must be given for constraint %s', __CLASS__), ['minAge']);
        }

        if (null === $this->maxAge) {
            throw new MissingOptionsException(sprintf('Option "maxAge" must be given for constraint %s', __CLASS__), ['maxAge']);
        }
    }
}