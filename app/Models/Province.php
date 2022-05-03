<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Province extends Model
{
    protected $table = 'provinces';

    public function regendistrib()
    {
        return $this->hasMany(Regendistrib::class);
    }
}