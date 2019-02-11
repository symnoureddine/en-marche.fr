<?php

namespace AppBundle\Form\DataTransformer;

use AppBundle\Jecoute\GenderEnum;
use AppBundle\Membership\MembershipRequest;
use Symfony\Component\Form\DataTransformerInterface;

class GenderTransformer implements DataTransformerInterface
{
    public function transform($membershipRequest)
    {
        if ($membershipRequest instanceof MembershipRequest &&
            !\in_array($membershipRequest->gender, [GenderEnum::MALE, GenderEnum::FEMALE, null])) {
            $membershipRequest->customGender = $membershipRequest->gender;
            $membershipRequest->gender = GenderEnum::OTHER;
        }

        return $membershipRequest;
    }

    /**
     * @param MembershipRequest $membershipRequest
     */
    public function reverseTransform($membershipRequest)
    {
        if (GenderEnum::OTHER === $membershipRequest->gender) {
            $membershipRequest->gender = $membershipRequest->customGender;
        }

        return $membershipRequest;
    }
}
