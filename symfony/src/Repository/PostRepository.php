<?php

namespace App\Repository;

use App\Entity\Post;
use App\Pagination\Paginator;
use DateTime;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Common\Persistence\ManagerRegistry;
use function count;
use function Symfony\Component\String\u;

class PostRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Post::class);
    }

    public function findLatest(int $page = 1, int $pageSize = Post::NUM_ITEMS): Paginator
    {
        $qb = $this->createQueryBuilder('p')
            ->where('p.publishedAt <= :now')
            ->orderBy('p.publishedAt', 'DESC')
            ->setParameter('now', new DateTime());

        return (new Paginator($qb, $pageSize))->paginate($page);
    }

    /**
     * @param string $query
     * @param int $page
     * @param int $limit
     * @return Paginator
     */
    public function findBySearchQuery(string $query, int $page = 1, int $limit = Post::NUM_ITEMS): Paginator
    {
        $searchTerms = $this->extractSearchTerms($query);

        if (0 === count($searchTerms)) {
            return [];
        }

        $queryBuilder = $this->createQueryBuilder('p');

        foreach ($searchTerms as $key => $term) {
            $queryBuilder
                ->orWhere('p.title LIKE :t_' . $key)
                ->setParameter('t_' . $key, '%' . $term . '%');
        }

        $queryBuilder
            ->orderBy('p.publishedAt', 'DESC')
            ->setMaxResults($limit)
            ->getQuery()
            ->getResult();

        return (new Paginator($queryBuilder, $limit))->paginate($page);
    }

    /**
     * Transforms the search string into an array of search terms.
     * @param string $searchQuery
     * @return array
     */
    private function extractSearchTerms(string $searchQuery): array
    {
        $searchQuery = u($searchQuery)->replaceMatches('/[[:space:]]+/', ' ')->trim();
        $terms = array_unique(u($searchQuery)->split(' '));

        // ignore the search terms that are too short
        return array_filter($terms, function ($term) {
            return 2 <= u($term)->length();
        });
    }
}
