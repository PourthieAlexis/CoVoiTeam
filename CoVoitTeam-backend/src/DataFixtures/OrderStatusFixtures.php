<?php

namespace App\DataFixtures;

use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use App\Entity\OrderStatus;

class OrderStatusFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        $names = ['En attente de paiement', 'En attente de validation', 'Validée', 'Annulée'];

        foreach ($names as $name) {
            $orderStatus = new OrderStatus();
            $orderStatus->setName($name);
            $manager->persist($orderStatus);
        }

        $manager->flush();
    }
}
