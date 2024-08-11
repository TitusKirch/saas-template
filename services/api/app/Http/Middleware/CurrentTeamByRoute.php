<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CurrentTeamByRoute
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        // set team id by request team parameter
        if (! empty(auth()->user() && $request->route('team'))) {
            setPermissionsTeamId($request->route('team'));
        }

        return $next($request);
    }
}
