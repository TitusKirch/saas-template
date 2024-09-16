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

    case UPDATE_TEAM = 'update team';
    case DELETE_TEAM = 'delete team';
    case RESTORE_TEAM = 'restore team';
    case FORCE_DELETE_TEAM = 'force delete team';
}
