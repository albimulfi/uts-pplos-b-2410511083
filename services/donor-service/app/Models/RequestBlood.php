<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class RequestBlood extends Model
{
    protected $fillable = ['hospital_id', 'blood_type', 'amount'];
}
