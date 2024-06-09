<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\App;
use LaravelLang\Locales\Facades\Locales;
use Symfony\Component\HttpFoundation\Response;

class AcceptLanguage
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if ($locale = $this->getLocale($request)) {
            App::setLocale($locale);
        }

        return $next($request);
    }

    /**
     * Get the locale from the request.
     */
    protected function getLocale(Request $request): ?string
    {
        $locales = Collection::make(explode(',', $request->header('Accept-Language', '')))
            ->map(function ($locale) {
                $parts = explode(';', $locale);

                $parsedLocal['locale'] = trim($parts[0]);

                if (isset($parts[1])) {
                    $factorParts = explode('=', $parts[1]);

                    $parsedLocal['factor'] = (float) trim($factorParts[1]);
                } else {
                    $parsedLocal['factor'] = 1.0;
                }

                return $parsedLocal;
            })
            ->sortByDesc('factor')
            ->pluck('locale');

        return $locales->first(fn ($locale) => Locales::isAvailable($locale));
    }
}
