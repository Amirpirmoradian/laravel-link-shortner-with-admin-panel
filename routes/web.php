<?php

use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\LinkController;
use AshAllenDesign\ShortURL\Facades\ShortURL;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
// Route::get('/{shortURLKey}', '\AshAllenDesign\ShortURL\Controllers\ShortURLController');

Route::redirect('/', '/admin/links', 301);

Route::prefix('admin')->middleware(['auth'])->group(function () {
    Route::redirect('/', '/admin/links', 301);

    Route::resource('/links', LinkController::class, [
        'names' => [
            'index' => 'admin-links-list',
            'edit' => 'admin-links-edit',
            'destroy' => 'admin-links-delete',
            'update' => 'admin-links-update',
        ],
    ]);
    
});
Auth::routes();

//set get method for logout
Route::get('logout', [LoginController::class, 'logout'])->name('logout');
Route::get('{shortURLKey}', '\AshAllenDesign\ShortURL\Controllers\ShortURLController');