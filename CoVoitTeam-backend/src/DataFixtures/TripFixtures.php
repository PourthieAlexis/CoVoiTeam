<?php

namespace App\DataFixtures;

use Faker\Factory;
use App\Entity\Trip;
use App\Entity\User;
use Doctrine\Persistence\ObjectManager;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;

class TripFixtures extends Fixture implements DependentFixtureInterface
{
    public function getDependencies(): array
    {
        return [
            UserFixtures::class,
        ];
    }
    public function load(ObjectManager $manager): void
    {
        $faker = Factory::create('fr_FR');

        // Récupération des utilisateurs créés par UserFixtures
        $users = $manager->getRepository(User::class)->findAll();

        for ($i = 0; $i < 50; $i++) {

            $trip = new Trip();
            $trip->setUser($users[array_rand($users)]);
            $trip->setDate($faker->dateTimeInInterval('- 30 days', '+ 30 days'));
            $trip->setNumberSeats($faker->numberBetween(0, 4));
            $trip->setSmallLuggage($faker->numberBetween(0, 3));
            $trip->setBigLuggage($faker->numberBetween(0, 2));
            ($trip->getDate() < new \DateTime('now')) ? $trip->setIsEnded(true) : $trip->setIsEnded(false);
            $trip->setPrice($faker->numberBetween(1000, 15000));
            $manager->persist($trip);
        }
        $manager->flush();
    }
}
