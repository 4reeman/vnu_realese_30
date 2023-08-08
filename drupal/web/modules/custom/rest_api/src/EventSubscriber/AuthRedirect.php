<?php

namespace Drupal\rest_api\EventSubscriber;

use Drupal\Core\Routing\RouteMatchInterface;
use Drupal\Core\Url;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpKernel\Event\RequestEvent;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpKernel\KernelEvents;
use Drupal\Core\Session\AccountInterface;

/**
 * Redirect Event for Anonymous user role.
 */
class AuthRedirect implements EventSubscriberInterface {

  /**
   * Account instance.
   *
   * @var \Drupal\Core\Session\AccountInterface
   */
  protected AccountInterface $user;

  /**
   * RouteMatch instance.
   *
   * @var \Drupal\Core\Routing\RouteMatchInterface
   */
  protected RouteMatchInterface $route;

  /**
   * AuthRedirect constructor.
   *
   * @param \Drupal\Core\Session\AccountInterface $current_user
   *   Account instance.
   * @param \Drupal\Core\Routing\RouteMatchInterface $current_route_match
   *   RouteMatch instance.
   */
  public function __construct(AccountInterface $current_user, RouteMatchInterface $current_route_match) {
    $this->user = $current_user;
    $this->route = $current_route_match;
  }

  /**
   * Redirect to login form on each request.
   *
   * If user role is Anonymous
   * and queried data isn`t a rest_api module response.
   *
   * @param \Symfony\Component\HttpKernel\Event\RequestEvent $event
   *   RequestEvent instance.
   */
  public function authRedirect(RequestEvent $event): void {

    $login = 'user.login';
    $rest_bundle = 'rest.content_bundle.GET';
    $rest_ids = 'rest.node_bundle.GET';
    $rest_node = 'rest.single_content.GET';
    $routeName = $this->route->getRouteName();
    if (
      !($routeName == $login
      || $routeName == $rest_bundle
      || $routeName == $rest_node
      || $routeName == $rest_ids)
      && $this->user->isAnonymous()
      ) {
//      $response = new RedirectResponse(Url::fromRoute($login)->toString(), 301);
//      $event->setResponse($response);
    }
  }

  /**
   * React to an event being propagated throughout the Event Registry.
   *
   * @return array|array[]|\array[][]|string[]
   *   SubscribedEvents array.
   */
  public static function getSubscribedEvents(): array {
    $events[KernelEvents::REQUEST][] = ['authRedirect'];
    return $events;
  }

}
