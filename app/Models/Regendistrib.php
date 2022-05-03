<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Regendistrib extends Model
{
    protected $table = 'distribution_regency';

    public function province()
    {
        return $this->belongsTo(Province::class);
    }

    // public function regency()
    // {
    //     return $this->belongsTo(Regency::class);
    // }
}