<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    public function companies()
    {
        return $this->belongsToMany('App\Company', 'order_providers', 'order_id', 'company_id');
    }

    public function cities()
    {
        return $this->belongsTo('App\Cities', 'arrival_city');
    }
}
