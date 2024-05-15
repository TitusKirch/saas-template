<?php

namespace App\Enums;

enum PermissionsEnum: string
{
    // Format: case NAMEINAPP = 'name-in-database';

    // Foo permissions
    case CREATE_FOO = 'create foo';
    case READ_FOO = 'read foo';
    case UPDATE_FOO = 'update foo'; // or edit?
    case DELETE_FOO = 'delete foo';
    case PUBLISH_FOO = 'publish foo'; // an action
    case UNPUBLISH_FOO = 'unpublish foo'; // another action
}