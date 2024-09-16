<?php

namespace App\Traits;

trait Sortable
{
    /**
     * Has sortable attributes.
     */
    public static function hasSortableAttributes(): bool
    {
        return count(self::sortableAttributes()) > 0;
    }

    /**
     * Get the sortable attributes for the model.
     */
    public static function sortableAttributes(): array
    {
        return [];
    }

    /**
     * Get fields which use natural sorting.
     */
    public static function naturalSortFields(): array
    {
        return [];
    }
}
