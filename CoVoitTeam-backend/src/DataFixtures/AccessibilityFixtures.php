<?php

namespace App\DataFixtures;

use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Faker\Factory;
use App\Entity\Accessibility;

class AccessibilityFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        $faker = Factory::create('fr_FR');

        for ($i = 0; $i < 10; $i++) {
            $accessibility = new Accessibility();
            $accessibility->setContent($faker->text(80));
            $manager->persist($accessibility);
        }

        $manager->flush();
    }
}
