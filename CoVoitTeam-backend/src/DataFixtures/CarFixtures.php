<?php

namespace App\DataFixtures;

use App\Entity\Accessibility;
use App\Entity\Brand;
use App\Entity\Model;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;
use Faker\Factory;
use App\Entity\Car;
use App\Entity\User;

class CarFixtures extends Fixture implements DependentFixtureInterface
{
    public function load(ObjectManager $manager): void
    {
        $faker = Factory::create('fr_FR');
        $accessibilities = $manager->getRepository(Accessibility::class)->findAll();
        $users = $manager->getRepository(User::class)->findAll();
        $brands = $manager->getRepository(Brand::class)->findAll();
        $models = $manager->getRepository(Model::class)->findAll();

        for ($i = 0; $i < 10; $i++) {
            $car = new Car();
            $user = $users[array_rand($users)];
            $car->setUser($user);
            $car->setYear($faker->dateTimeBetween('-20 years', 'now'));
            $car->setColor($faker->randomNumber(6, true));
            // ajouter 1 marque au hasard
            $brand = $brands[array_rand($brands)];
            $car->setBrand($brand);
            // trier les modèles par marque
            $modelsByBrand = array_filter($models, function ($model) use ($brand) {
                return $model->getBrand() === $brand;
            });
            // ajouter 1 modèle au hasard
            $model = $modelsByBrand[array_rand($modelsByBrand)];
            $car->setModel($model);
            // ajouter 3 accessibilités au hasard
            for ($j = 0; $j < 3; $j++) {
                $accessibility = $accessibilities[array_rand($accessibilities)];
                // vérifier que l'accessibilité n'est pas déjà dans la voiture
                if ($car->getAccesibility()->contains($accessibility)) {
                    continue;
                }
                $car->addAccesibility($accessibility);
            }
            // générer une plaque d'immatriculation française
            $registration = $faker->regexify('[A-Z]{2}-[0-9]{3}-[A-Z]{2}');
            // transformer $registration en string
            // settype($registration, "string");
            $car->setRegistration($registration);
            $manager->persist($car);
        }

        $manager->flush();
    }
    public function getDependencies(): array
    {
        return [
            AccessibilityFixtures::class,
            BrandFixtures::class,
            ModelFixtures::class,
            UserFixtures::class,
        ];
    }
}
