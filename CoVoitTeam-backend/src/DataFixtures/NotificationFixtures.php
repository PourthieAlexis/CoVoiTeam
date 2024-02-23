<?php

namespace App\DataFixtures;

use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use App\Entity\Notification;
use App\Entity\User;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;
use Faker\Factory;

class NotificationFixtures extends Fixture implements DependentFixtureInterface
{
    public function load(ObjectManager $manager): void
    {
        $users = $manager->getRepository(User::class)->findAll();
        $faker = Factory::create('fr_FR');
        // faire un random sur les users

        for ($i = 0; $i < 10; $i++) {
            $notification = new Notification();

            $notification->setCreatedAt(\DateTimeImmutable::createFromMutable($faker->dateTimeBetween('-30 days', 'now')));
            $user = $users[array_rand($users)];
            $notification->setUser($user);
            $notification->setContent($faker->text(20));
            $notification->setIsRead(false);

            $manager->persist($notification);
        }
        $manager->flush();
    }
    public function getDependencies(): array
    {
        return [
            UserFixtures::class,
        ];
    }
}
