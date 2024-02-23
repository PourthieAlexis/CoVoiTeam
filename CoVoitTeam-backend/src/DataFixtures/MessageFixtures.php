<?php

namespace App\DataFixtures;

use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use App\Entity\Message;
use App\Entity\User;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;
use Faker\Factory;

class MessageFixtures extends Fixture implements DependentFixtureInterface
{
    public function load(ObjectManager $manager): void
    {
        $users = $manager->getRepository(User::class)->findAll();
        $faker = Factory::create('fr_FR');

        for ($i = 0; $i < 30; $i++) {
            $message = new Message();

            $message->setCreatedAt(\DateTimeImmutable::createFromMutable($faker->dateTimeBetween('-30 days', 'now')));
            $message->setContent($faker->text(200));
            $message->setIsRead(false);
            $user = $users[array_rand($users)];
            $message->setUser($user);
            $userReceiving = $users[array_rand($users)];
            $message->setUserReceiving($userReceiving);

            $manager->persist($message);
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
