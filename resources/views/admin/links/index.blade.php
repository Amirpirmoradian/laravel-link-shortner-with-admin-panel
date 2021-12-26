@extends('admin.layouts.index')

@section('content')
    <div class="col-md-12 col-sm-12 col-xs-12">

        <div class="x_panel">
            <div class="x_title">
                <h2>
                    {{ __('اضافه کردن لینک جدید') }}
                </h2>
                <div class="clearfix"></div>
            </div>
            <div class="x_content">
                <br>
                <form action="{{ isset($currentLink) ? route('admin-links-update', $currentLink->id)  : route('admin-links-list') }}" enctype="multipart/form-data""
                    method="POST" class="form-horizontal form-label-left">
                    @csrf
                    @if (isset($currentLink))
                        @method('PUT')
                        <input type="text" hidden value="{{ $currentLink->id }}" name="link_id">
                    @endif
                    <div class="form-group">
                        <label class="control-label col-md-3 col-sm-3 col-xs-12">{{ __('لینک اصلی') }}</label>
                        <div class="col-md-9 col-sm-9 col-xs-12">
                            <input  type="text" class="form-control" style="direction:ltr;text-align:right" name="link" placeholder="{{ __('لینک اصلی') }}"
                                value="{{ isset($currentLink) ? $currentLink->link : '' }}">
                        </div>
                    </div>

                    <div class="form-group">
                        <label class="control-label col-md-3 col-sm-3 col-xs-12">{{ __('لینک کوتاه شده') }}</label>
                        <div class="col-md-9 col-sm-9 col-xs-12">
                            <input  type="text" class="form-control" style="direction:ltr;text-align:right" name="shorten_link" placeholder="{{ __('اگر خالی بگذارید به صورت اتوماتیک یک لینک کوتاه تولید می‌شود') }}"
                                value="{{ isset($currentLink) ? $currentLink->shorten_link : '' }}">
                        </div>
                    </div>

                   

                    <div class="ln_solid"></div>
                    <div class="form-group">
                        <div class="col-md-9 col-sm-9 col-xs-12 col-md-offset-3">
                            <button type="submit" class="btn btn-success">
                                {{ isset($currentLink) ? __('ویرایش') : __('اضافه کردن') }}
                            </button>
                        </div>
                    </div>

                </form>
            </div>
        </div>

        <div class="x_panel">
            <div class="x_title">
                <br>
                <br>
                <form class="form-horizontal form-label-left" action="{{ route('admin-links-list') }}" method="GET">
                    <div class="form-group">
                        <div class="col-md-9 col-sm-9 col-xs-12">
                            <input type="text" class="form-control" style="direction:ltr;text-align:right" name="q" placeholder="{{ __('جستجو') }}"
                                value="{{ request()->input('q', '') }}">
                        </div>
                        <div class="col-md-3 col-sm-3 col-xs-12">
                            <button type="submit" class="btn btn-success">
                                جستجو
                            </button>
                        </div>
                        
                    </div>
                    
                </form>
                <div class="clearfix"></div>
            </div>

            <div class="x_content">
                <div class="table-responsive">
                    <table class="table table-striped jambo_table" id="branches-table">
                        <thead>
                            <tr class="headings">
                                <th class="column-title" style="display: table-cell;width: 50%;">{{ __('لینک اصلی') }}</th>
                                <th class="column-title" style="display: table-cell;width: 35%;">{{ __('لینک کوتاه شده') }}</th>
                                <th class="column-title no-link last" style="display: table-cell;width: 15%;">
                                    <span class="nobr">
                                        {{ __('عملیات') }}
                                    </span>
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            @foreach ($links as $link)
                                <tr class="even pointer">
                                    <td>
                                        <a href="{{ $link->destination_url }}" target="_blank">{{ $link->destination_url }}</a>
                                    </td>

                                    <td>
                                        @php
                                            $shortURL = str_replace('//' , '/', $link->default_short_url);
                                            $shortURL = str_replace('http:/' , 'http://', $shortURL);
                                            $shortURL = str_replace('https:/' , 'https://', $shortURL);
                                            $shortURL = str_replace('/short/' , '/', $shortURL);
                                        @endphp 
                                        <a href="{{ $shortURL }}" target="_blank">{{ $shortURL }}</a>
                                    </td>

                                 

                                    <td class=" last">
                                        <form style="display: inline;" method="POST"
                                            action="{{ route('admin-links-delete', $link->id) }}">
                                            @csrf
                                            @method('delete')
                                            <button type="submit" class="btn btn-danger delete-btn">
                                                {{ __('حذف') }}
                                            </button>

                                        </form>
                                    </td>
                                </tr>
                            @endforeach
                        </tbody>
                    </table>
                </div>
                {{ $links->appends(request()->all())->links() }}
            </div>
        </div>
    </div>
@endsection
