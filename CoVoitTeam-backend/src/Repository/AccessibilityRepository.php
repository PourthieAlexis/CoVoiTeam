<?php

namespace App\Repository;

use App\Entity\Accessibility;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Accessibility>
 *
 * @method Accessibility|null find($id, $lockMode = null, $lockVersion = null)
 * @method Accessibility|null findOneBy(array $criteria, array $orderBy = null)
 * @method Accessibility[]    findAll()
 * @method Accessibility[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class AccessibilityRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Accessibility::class);
    }

//    /**
//     * @return Accessibility[] Returns an array of Accessibility objects
//     */
//    public function findByExampleField($value): array
//    {
//        return $this->createQueryBuilder('a')
//            ->andWhere('a.exampleField = :val')
//            ->setParameter('val', $value)
//            ->orderBy('a.id', 'ASC')
//            ->setMaxResults(10)
//            ->getQuery()
//            ->getResult()
//        ;
//    }

//    public function findOneBySomeField($value): ?Accessibility
//    {
//        return $this->createQueryBuilder('a')
//            ->andWhere('a.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
