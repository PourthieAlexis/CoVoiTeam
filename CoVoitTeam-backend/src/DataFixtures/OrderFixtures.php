<?php

namespace App\DataFixtures;

use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use App\Entity\Order;
use App\Entity\OrderStatus;
use App\Entity\User;
use Faker\Factory;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;

class OrderFixtures extends Fixture implements DependentFixtureInterface
{
    public function load(ObjectManager $manager): void
    {
        $faker = Factory::create('fr_FR');
        $users = $manager->getRepository(User::class)->findAll();
        $orderStatuses = $manager->getRepository(OrderStatus::class)->findAll();

        for ($i = 0; $i < 10; $i++) {
            $order = new Order();
            $order->setCreatedAt(\DateTimeImmutable::createFromMutable($faker->dateTimeBetween('-30 days', 'now')));
            $order->setAmount($faker->randomFloat(2, 10, 1000));
            $order->setPointAmount($faker->numberBetween(1, 2));
            $order->setType($faker->randomElement(['buy', 'sell']));
            $order->setUser($users[array_rand($users)]);
            $order->setOrderStatus($orderStatuses[array_rand($orderStatuses)]);
            $manager->persist($order);
        }

        $manager->flush();
    }
    public function getDependencies(): array
    {
        return [
            UserFixtures::class,
            OrderStatusFixtures::class,
        ];
    }
}
