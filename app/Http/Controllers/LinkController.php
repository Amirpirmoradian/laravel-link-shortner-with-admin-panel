<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateLinkRequest;
use App\Models\Link;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class LinkController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $links = DB::table('short_urls')->paginate(15);
        return view('admin.links.index', compact('links'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(CreateLinkRequest $request)
    {
        $link = $request->input('link' , false);
        $shortenLink = $request->input('shorten_link' , false);
        if(!$link){
            return redirect()->back()->with([
                'error' => 'لینک اصلی نمی‌تواند خالی باشد.'
            ]);
        }
        if(!filter_var($link, FILTER_VALIDATE_URL)){
            return redirect()->back()->with([
                'error' => 'لینک اصلی وارد شده معتبر نیست'
            ]);
        }
        

        $builder = new \AshAllenDesign\ShortURL\Classes\Builder();

        $shortURLObject = $builder->destinationUrl($link);
        if($shortenLink){
            $shortURLObject = $shortURLObject->urlKey($shortenLink);
        }
        try {
            $shortURLObject = $shortURLObject->make();
        } catch (\Exception $e) {
            if($e->getMessage() == "A short URL with this key already exists."){
                return redirect()->back()->with([
                    'error' => 'لینک کوتاه وارد شده از قبل وجود دارد.'
                ]);
            }
        }

        return redirect()->back()->with([
            'success'   => 'لینک با موفقیت اضافه شد.'
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Link  $link
     * @return \Illuminate\Http\Response
     */
    public function show(Link $link)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Link  $link
     * @return \Illuminate\Http\Response
     */
    public function edit(Link $link)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Link  $link
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Link $link)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Link  $link
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        DB::table('short_urls')->where('id', $id)->delete();
        return redirect()->back()->with([
            'success'   => 'لینک با موفقیت حذف شد.'
        ]);
    }
}
