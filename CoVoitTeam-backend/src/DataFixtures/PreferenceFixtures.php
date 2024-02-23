<?php

namespace App\DataFixtures;

use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use App\Entity\Preference;

class PreferenceFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        $titles = [
            "Je fumes / Tu peux fumer",
            "Je fumes / Tu ne peux pas fumer",
            "Je ne fumes pas / Tu peux fumer",
            "Je ne fumes pas / Tu ne peux pas fumer",
            "J'écoute tous les styles de musique",
            "J'écoute tous les styles de musique sauf le rap",
            "J'écoute uniquement du rock",
            "Je n'écoute pas de musique",
            "Les animaux de compagnie sont les bienvenus",
            "Les animaux de compagnie ne sont pas les bienvenus",
        ];

        foreach ($titles as $title) {
            $preference = new Preference();
            $preference->setTitle($title);
            $manager->persist($preference);
        }

        $manager->flush();
    }
}
