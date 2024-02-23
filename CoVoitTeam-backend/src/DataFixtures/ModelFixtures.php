<?php

namespace App\DataFixtures;

use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;
use App\Entity\Brand;
use App\Entity\Model;


class ModelFixtures extends Fixture implements DependentFixtureInterface
{
    public function load(ObjectManager $manager): void
    {
        $modelsByBrand = [
            'Peugeot' => ['108', '208', '308', '508', '2008', '3008', '5008', 'Rifter', 'Partner', 'Expert', 'Traveller', 'Capture'],
            'Renault' => ['Twingo', 'Clio', 'ZOE', 'Captur', 'Mégane', 'Scénic', 'Kadjar', 'Talisman', 'Espace', 'Kangoo', 'Trafic', 'Master', 'Twizy'],
            'Citroën' => ['C1', 'C2', 'C3', 'C4', 'C5', 'C6', 'C7', 'C8'],
            'Opel' => ['Corsa', 'Astra', 'Crossland', 'Grandland', 'Mokka', 'Zafira', 'Combo', 'Movano', 'Vivaro'],
            'Volkswagen' => ['Up', 'Polo', 'Golf', 'Passat', 'T-Roc', 'T-Cross', 'Tiguan', 'Touran', 'Sharan', 'Caddy', 'Transporter', 'Caravelle', 'California', 'Amarok'],
            'Audi' => ['A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'A7', 'A8'],
            'Mercedes-Benz' => ['Classe A', 'Classe B', 'Classe C', 'Classe E', 'Classe S', 'Classe G', 'Classe GLA', 'Classe GLB', 'Classe GLC', 'Classe GLE', 'Classe GLS', 'Classe EQ', 'Classe V', 'Classe X'],
            'BMW' => ['Série 1', 'Série 2', 'Série 3', 'Série 4', 'Série 5', 'Série 6', 'Série 7', 'Série 8'],
            'Ford' => ['Fiesta', 'Focus', 'Mondeo', 'Mustang', 'Kuga', 'Puma', 'EcoSport', 'Edge', 'Galaxy', 'S-MAX', 'Tourneo'],
            'DS' => ['DS 3', 'DS 4', 'DS 5', 'DS 7', 'DS 9', 'DS X E-TENSE'],
            'Toyota' => ['Aygo', 'Yaris', 'Corolla', 'C-HR', 'RAV4', 'Prius', 'Camry', 'GT86', 'Land Cruiser', 'Hilux', 'PROACE', 'Mirai'],
            'Fiat' => ['500', '500X', '500L', 'Panda', 'Tipo', 'Punto', 'Doblò', 'Talento', 'Ducato'],
            'Chrysler' => ['300C', 'Grand Voyager'],
            'Tesla' => ['Model 3', 'Model S', 'Model X', 'Model Y', 'Roadster', 'Cybertruck', 'Semi'],
            'Dacia' => ['Sandero', 'Duster', 'Logan', 'Lodgy', 'Dokker', 'Spring'],
            'Nissan' => ['Micra', 'Juke', 'Qashqai', 'X-Trail', 'Leaf', 'E-NV200', 'NV250', 'NV300', 'NV400'],
            'Honda' => ['Jazz', 'Civic', 'HR-V', 'CR-V', 'e', 'NSX'],
            'Hyundai' => ['i10', 'i20', 'i30', 'i40', 'IONIQ', 'KONA', 'Tucson', 'Santa Fe', 'NEXO'],
            'Kia' => ['Picanto', 'Rio', 'Ceed', 'Stonic', 'Niro', 'Sportage', 'Sorento', 'e-Soul', 'e-Niro'],
            'Mazda' => ['2', '3', '6', 'CX-3', 'CX-30', 'CX-5', 'MX-30'],
            'Seat' => ['Mii', 'Ibiza', 'Leon', 'Arona', 'Ateca', 'Tarraco', 'Alhambra'],
            'Skoda' => ['Citigo', 'Fabia', 'Scala', 'Octavia', 'Kamiq', 'Karoq', 'Kodiaq', 'Superb', 'Enyaq'],
            'Suzuki' => ['Swift', 'Ignis', 'Baleno', 'S-Cross', 'Vitara', 'Jimny'],
            'Alfa Romeo' => ['MiTo', 'Giulietta', 'Giulia', 'Stelvio'],
            'Volvo' => ['XC40', 'XC60', 'XC90', 'S60', 'S90', 'V60', 'V90', 'V40', 'V40 Cross Country', 'V60 Cross Country', 'V90 Cross Country', 'XC60 Recharge', 'XC90 Recharge', 'S60 Recharge', 'S90 Recharge', 'V60 Recharge', 'V90 Recharge'],
        ];

        $brands = $manager->getRepository(Brand::class)->findAll();

        foreach ($brands as $brand) {
            foreach ($modelsByBrand[$brand->getName()] as $modelName) {
                $model = new Model();
                $model->setName($modelName);
                $model->setBrand($brand);
                $manager->persist($model);
            }
        }

        $manager->flush();
    }
    public function getDependencies(): array
    {
        return [
            BrandFixtures::class,
        ];
    }
}
