<?php

namespace App\DataFixtures;

use Faker\Factory;
use App\Entity\Trip;
use App\Entity\User;
use App\Entity\Booking;
use Doctrine\Persistence\ObjectManager;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;

class BookingFixtures extends Fixture implements DependentFixtureInterface
{
    public function getDependencies(): array
    {
        return [
            UserFixtures::class,
            TripFixtures::class,
        ];
    }
    public function load(ObjectManager $manager): void
    {
        // Récupération des utilisateurs créés par UserFixtures
        $users = $manager->getRepository(User::class)->findAll();
        // Récupération des voyages créés par TripFixtures
        $trips = $manager->getRepository(Trip::class)->findAll();

        $faker = Factory::create('fr_FR');

        foreach ($trips as $trip) {
            $usersPassengers = array();
            $numberOfPassengers = $faker->numberBetween(0, 4);

            for ($i = 0; $i < $numberOfPassengers; $i++) {
                $booking = new Booking();
                $booking->setTrip($trip);

                // Je récupère un utilisateur au hasard qui n'est pas l'auteur du voyage
                $userPassenger = $this->getRandomUserPassenger($trip, $users);

                // Je vérifie que l'utilisateur n'est pas déjà passager du voyage
                if (in_array($userPassenger->getId(), $usersPassengers)) {
                    continue;
                } else {
                    array_push($usersPassengers, $userPassenger->getId());
                    $booking->setUser($userPassenger);
                }

                // $booking->setUser($userPassenger);
                $booking->setCreatedAt(\DateTimeImmutable::createFromMutable($faker->dateTimeInInterval('now', '+ 30 days')));
                $booking->setIsValidated($faker->numberBetween(0, 1));

                $manager->persist($booking);
            }
        }

        $manager->flush();
    }
    public function getRandomUserPassenger($trip, $users)
    {
        $user = $users[array_rand($users)];
        $condition = ($user->getId() === $trip->getUser()->getId()) ? true : false;
        if ($condition) {
            $user = $this->getRandomUserPassenger($trip, $users);
        }

        return $user;
    }
}
