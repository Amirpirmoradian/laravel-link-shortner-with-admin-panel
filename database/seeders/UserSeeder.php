<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use DB;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->insert([
            'name' => 'Amir Pitmoradian',
            'email' => 'piramir77@gmail.com',
            'type' => 'super',
            'password' => Hash::make('yNy31q!WuN9PQ0Yh92ZN6Pt'),
        ]);
    }
}
