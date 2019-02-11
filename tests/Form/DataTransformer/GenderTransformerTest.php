<?php

namespace Tests\AppBundle\Form\DataTransformer;

use AppBundle\Form\DataTransformer\GenderTransformer;
use AppBundle\Membership\MembershipRequest;
use AppBundle\ValueObject\Genders;
use PHPUnit\Framework\TestCase;

class GenderTransformerTest extends TestCase
{
    /**
     * @dataProvider getTransformData
     */
    public function testTransform(?string $gender, ?string $customGender, ?string $newGender): void
    {
        $genderTransformer = new GenderTransformer();

        $membership = new MembershipRequest();
        $membership->gender = $gender;
        $membership->customGender = $customGender;

        $genderTransformer->transform($membership);

        $this->assertSame($newGender, $membership->gender);
        $this->assertSame($customGender, $membership->customGender);
    }

    public function getTransformData(): \Iterator
    {
        yield [null, null, null];
        yield [Genders::MALE, null, Genders::MALE];
        yield [Genders::MALE, '', Genders::MALE];
        yield [Genders::FEMALE, null, Genders::FEMALE];
        yield [Genders::FEMALE, '', Genders::FEMALE];
        yield ['custom gender', 'custom gender', Genders::OTHER];
    }

    /**
     * @dataProvider getReverseTransformData
     */
    public function testReverseTransform(string $gender, ?string $customGender, string $newGender): void
    {
        $genderTransformer = new GenderTransformer();

        $membership = new MembershipRequest();
        $membership->gender = $gender;
        $membership->customGender = $customGender;

        $genderTransformer->reverseTransform($membership);

        $this->assertSame($newGender, $membership->gender);
        $this->assertSame($customGender, $membership->customGender);
    }

    public function getReverseTransformData(): \Iterator
    {
        yield [Genders::MALE, null, Genders::MALE];
        yield [Genders::MALE, '', Genders::MALE];
        yield [Genders::FEMALE, null, Genders::FEMALE];
        yield [Genders::FEMALE, '', Genders::FEMALE];
        yield [Genders::OTHER, 'custom gender', 'custom gender'];
    }
}
