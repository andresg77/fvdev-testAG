<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Info extends Model
{
    protected $fillable = ['firstName','lastName','email','gender','phone','dateOfBirth','comments'];
}
