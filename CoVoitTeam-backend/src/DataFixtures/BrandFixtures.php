<?php

namespace App\DataFixtures;

use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use App\Entity\Brand;

class BrandFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        $brands = ['Peugeot', 'Renault', 'Citroën', 'Opel', 'Volkswagen', 'Audi', 'Mercedes-Benz', 'BMW', 'Ford', 'DS', 'Toyota', 'Fiat', 'Chrysler', 'Tesla', 'Dacia', 'Nissan', 'Honda', 'Hyundai', 'Kia', 'Mazda', 'Seat', 'Skoda', 'Suzuki', 'Alfa Romeo', 'Volvo'];

        foreach ($brands as $brandName) {
            $brand = new Brand();
            $brand->setName($brandName);
            $manager->persist($brand);
        }

        $manager->flush();
    }
}
