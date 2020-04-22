<?php

namespace App\Controller;

use App\Entity\Post;
use App\Repository\PostRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("/blog")
 */
class BlogController extends AbstractController
{
    /**
     * @Route("/", methods="POST", name="blog_index")
     */
    public function index(Request $request, PostRepository $posts): Response
    {
        $limit = $request->get('limit', 10);

        $page = $request->get('page', 1);

        $latestPosts = $posts->findLatest($page, $limit);

        return $this->json($latestPosts);
    }

    /**
     * @Route("/posts/{slug}", methods="GET", name="blog_post")
     */
    public function postShow(Post $post): Response
    {
        return $this->json($post);
    }

    /**
     * @Route("/search", methods="POST", name="blog_search")
     */
    public function search(Request $request, PostRepository $posts): Response
    {
        $query = $request->get('searchValue', '');

        $limit = $request->get('limit', 10);

        $page = $request->get('page', 1);

        $foundPosts = $posts->findBySearchQuery($query, $page, $limit);

//        $results = [];
//
//        foreach ($foundPosts as $post) {
//            $results[] = [
//                'title' => htmlspecialchars($post->getTitle(), ENT_COMPAT | ENT_HTML5),
//                'date' => $post->getPublishedAt()->format('M d, Y'),
//                'author' => htmlspecialchars($post->getAuthor()->getFullName(), ENT_COMPAT | ENT_HTML5),
//                'summary' => htmlspecialchars($post->getSummary(), ENT_COMPAT | ENT_HTML5),
//                'url' => $this->generateUrl('blog_post', ['slug' => $post->getSlug()]),
//            ];
//        }

        return $this->json($foundPosts);
    }
}
