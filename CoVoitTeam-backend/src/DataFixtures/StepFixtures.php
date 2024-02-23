<?php

namespace App\DataFixtures;

use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;
use App\Entity\Step;
use App\Entity\Trip;
use Faker\Factory;

class StepFixtures extends Fixture implements DependentFixtureInterface
{
    public function load(ObjectManager $manager): void
    {
        $trips = $manager->getRepository(Trip::class)->findAll();
        $faker = Factory::create('fr_FR');
        // $step->setType($faker->randomElement(['departure', 'step', 'arrival']));

        foreach ($trips as $trip) {

            // si adresse de départ différente de l'adresse du conducteur
            if ($faker->numberBetween(0, 1)) {
                $step = $this->createStep($trip, 'departure');
                $manager->persist($step);
            }else{
                $address = $trip->getUser()->getAddress();
                $step = $this->createStep($trip, 'departure');
                $step->setNumber($address->getNumber());
                $step->setStreet($address->getStreet());
                $step->setZipcode($address->getZipcode());
                $step->setCity($address->getCity());
                $step->setCountry($address->getCountry());
                $step->setLatitude($address->getLatitude());
                $step->setLongitude($address->getLongitude());
                $manager->persist($step);
            }

            $numberOfSteps = $faker->numberBetween(0, 5);
            for ($i = 0; $i < $numberOfSteps; $i++) {
                $step = $this->createStep($trip, 'step');

                $manager->persist($step);
            }

            if ($faker->numberBetween(0, 1)) {
                $step = $this->createStep($trip, 'arrival');
                $manager->persist($step);
            }
        }

        $manager->flush();
    }
    public function createStep($trip, $type)
    {
        $faker = Factory::create('fr_FR');
        $step = new Step();
        $step->setTrip($trip);
        $step->setType($type);
        $step->setNumber($faker->buildingNumber());
        $step->setStreet($faker->streetName());
        $step->setZipcode(str_replace(' ', '', $faker->postcode()));
        $step->setCity($faker->city());
        $step->setCountry('France');
        $step->setLatitude($faker->latitude());
        $step->setLongitude($faker->longitude());

        return $step;
    }

    public function getDependencies(): array
    {
        return [
            TripFixtures::class,
        ];
    }
}
