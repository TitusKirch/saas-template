<?php

namespace App\Pagination;

use Illuminate\Pagination\LengthAwarePaginator;

class SimpleLengthAwarePaginator extends LengthAwarePaginator
{
    /**
     * {@inheritdoc}
     */
    public function __construct($items, $total, $perPage, $currentPage = null, array $options = [])
    {
        parent::__construct($items, $total, $perPage, $currentPage, $options);

        if (isset(static::$queryStringResolver)) {
            $this->appends(call_user_func(static::$queryStringResolver));
        }
    }

    /**
     * {@inheritdoc}
     */
    public function toArray()
    {
        return array_diff_key(parent::toArray(), ['links' => null]);
    }
}
