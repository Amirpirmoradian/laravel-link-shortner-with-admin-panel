<!DOCTYPE html>
<html dir="ltr">

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <!-- Meta, title, CSS, favicons, etc. -->
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="fontiran.com:license" content="Y68A9">
    <link rel="icon" href="/assets/images/favicon.ico" type="image/ico" />
    <title>
        {{ config('app.name') }}
    </title>

    <!-- Bootstrap -->
    <link href="/assets/packages/bootstrap/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="/assets/packages/bootstrap-rtl/dist/css/bootstrap-rtl.min.css" rel="stylesheet">
    <!-- Font Awesome -->
    <link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css" integrity="sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p" crossorigin="anonymous"/>
    <!-- NProgress -->
    <link href="/assets/packages/nprogress/nprogress.css" rel="stylesheet">
    <!-- bootstrap-progressbar -->
    <link href="/assets/packages/bootstrap-progressbar/css/bootstrap-progressbar-3.3.4.min.css" rel="stylesheet">
    <!-- iCheck -->
    <link href="/assets/packages/iCheck/skins/flat/green.css" rel="stylesheet">
    <!-- bootstrap-daterangepicker -->
    <link href="/assets/css/persian-datepicker.min.css" rel="stylesheet">

    <!-- Custom Theme Style -->
    <link href="/assets/css/custom.css" rel="stylesheet">
</head>
<!-- /header content -->

<body class="nav-md">
    <div class="container body">
        <div class="main_container">
            <div class="col-md-3 left_col hidden-print">
                <div class="left_col scroll-view">
                    <div class="navbar nav_title" style="border: 0;">
                        <a href="/admin" class="site_title">
                            <i class="fad fa-hamburger"></i>
                            <span></span>
                        </a>
                    </div>

                    <div class="clearfix"></div>

                    <!-- menu profile quick info -->
                    <div class="profile clearfix">
                        <div class="profile_pic">
                        </div>
                        <div class="profile_info">
                            <span>{{ __('خوش‌ آمدید') }},</span>
                            @if(auth()->user())
                                <h2>{{ auth()->user()->name }}</h2>
                            @endif
                        </div>
                    </div>
                    <!-- /menu profile quick info -->

                    <br />

                    <!-- sidebar menu -->
                    <div id="sidebar-menu" class="main_menu_side hidden-print main_menu">
                        <div class="menu_section">
                            <h3>{{ __('منو') }}</h3>
                            <ul class="nav side-menu">
                                
                            </ul>
                        </div>


                    </div>
                    <!-- /sidebar menu -->

                    <!-- /menu footer buttons -->
                    <div class="sidebar-footer hidden-small">
                        <a data-toggle="tooltip" data-placement="top" title="تنظیمات">
                            <span class="glyphicon glyphicon-cog" aria-hidden="true"></span>
                        </a>
                        <a data-toggle="tooltip" data-placement="top" title="تمام صفحه" onclick="toggleFullScreen();">
                            <span class="glyphicon glyphicon-fullscreen" aria-hidden="true"></span>
                        </a>
                        <a data-toggle="tooltip" data-placement="top" title="قفل" class="lock_btn">
                            <span class="glyphicon glyphicon-eye-close" aria-hidden="true"></span>
                        </a>
                        <a data-toggle="tooltip" data-placement="top" title="خروج" href="/logout">
                            <span class="glyphicon glyphicon-off" aria-hidden="true"></span>
                        </a>
                    </div>
                    <!-- /menu footer buttons -->
                </div>
            </div>

            <!-- top navigation -->
            <div class="top_nav hidden-print">
                <div class="nav_menu">
                    <nav>
                        <div class="nav toggle">
                            <a id="menu_toggle"><i class="fa fa-bars"></i></a>
                        </div>

                        <ul class="nav navbar-nav navbar-right">
                            <li class="">
                                <a href="javascript:;" class="user-profile dropdown-toggle" data-toggle="dropdown"
                                    aria-expanded="false">
                                    @if(auth()->user())
                                        {{ auth()->user()->name }}
                                    @endif
                                    <span class=" fa fa-angle-down"></span>
                                </a>
                                <ul class="dropdown-menu dropdown-usermenu pull-right">
                                    <li><a href="/logout">
                                            <i class="fa fa-sign-out pull-right"></i>
                                    ‍        {{ __('خروج') }}
                                        </a>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
            <!-- /top navigation -->
            <!-- /header content -->

            <!-- page content -->
            <div class="right_col" role="main">
                @if ($errors->any())
                    <div class="alert alert-danger">
                        <ul>
                            @foreach ($errors->all() as $error)
                                <li>{{ $error }}</li>
                            @endforeach
                        </ul>
                    </div>
                @endif
                <div class="col-md-12 col-xs-12">
                    @if (\Session::has('success'))
                        <div class="alert alert-success alert-dismissible fade in" role="alert">
                            {!! \Session::get('success') !!}
                        </div>
                    @endif

                    @if (\Session::has('error'))
                        <div class="alert alert-danger alert-dismissible fade in" role="alert">
                            {!! \Session::get('error') !!}
                        </div>
                    @endif
                </div>
                @yield('content')
            </div>
            <!-- /page content -->

            <!-- footer content -->
            <footer class="hidden-print">

                <div class="clearfix"></div>
            </footer>
            <!-- /footer content -->
        </div>
    </div>
    <div id="lock_screen">
        <table>
            <tr>
                <td>
                    <div class="clock"></div>
                    <span class="unlock">
                        <span class="fa-stack fa-5x">
                            <i class="fa fa-square-o fa-stack-2x fa-inverse"></i>
                            <i id="icon_lock" class="fa fa-lock fa-stack-1x fa-inverse"></i>
                        </span>
                    </span>
                </td>
            </tr>
        </table>
    </div>
    <!-- jQuery -->
    <script src="/assets/packages/jquery/dist/jquery.min.js"></script>
    <!-- Bootstrap -->
    <script src="/assets/packages/bootstrap/dist/js/bootstrap.min.js"></script>
    <!-- FastClick -->
    <script src="/assets/packages/fastclick/lib/fastclick.js"></script>
    <!-- NProgress -->
    <script src="/assets/packages/nprogress/nprogress.js"></script>
    <!-- bootstrap-progressbar -->
    <script src="/assets/packages/bootstrap-progressbar/bootstrap-progressbar.min.js"></script>
    <!-- iCheck -->
    <script src="/assets/packages/iCheck/icheck.min.js"></script>

    <!-- bootstrap-daterangepicker -->
    <script src="/assets/packages/moment/min/moment.min.js"></script>

    <script src="/assets/packages/bootstrap-daterangepicker/daterangepicker.js"></script>

    <!-- jQuery Sparklines -->
    <script src="/assets/packages/jquery-sparkline/dist/jquery.sparkline.min.js"></script>
    <!-- gauge.js -->
    <script src="/assets/packages/gauge.js/dist/gauge.min.js"></script>
    <!-- Skycons -->
    <script src="/assets/packages/skycons/skycons.js"></script>
    <!-- Flot -->
    <script src="/assets/packages/Flot/jquery.flot.js"></script>
    <script src="/assets/packages/Flot/jquery.flot.pie.js"></script>
    <script src="/assets/packages/Flot/jquery.flot.time.js"></script>
    <script src="/assets/packages/Flot/jquery.flot.stack.js"></script>
    <script src="/assets/packages/Flot/jquery.flot.resize.js"></script>
    <!-- Flot plugins -->
    <script src="/assets/packages/flot.orderbars/js/jquery.flot.orderBars.js"></script>
    <script src="/assets/packages/flot-spline/js/jquery.flot.spline.min.js"></script>
    <script src="/assets/packages/flot.curvedlines/curvedLines.js"></script>

    <link href="/assets/packages/switchery/dist/switchery.min.css" rel="stylesheet">
    <script src="/assets/packages/switchery/dist/switchery.min.js"></script>
    <!-- DateJS -->
    <script src="/assets/packages/DateJS/build/production/date.min.js"></script>
    <!-- JQVMap -->
    <script src="/assets/packages/jqvmap/dist/jquery.vmap.js"></script>
    <script src="/assets/packages/jqvmap/dist/maps/jquery.vmap.world.js"></script>
    <script src="/assets/packages/jqvmap/examples/js/jquery.vmap.sampledata.js"></script>

    <script src="/assets/packages/select2/dist/js/select2.js"></script>
    <link rel="stylesheet" type="text/css" href="/assets/packages/select2/dist/css/select2.css" />

    <link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/v/dt/dt-1.10.21/datatables.min.css" />
    <script type="text/javascript" src="https://cdn.datatables.net/v/dt/dt-1.10.21/datatables.min.js"></script>

    <link rel="stylesheet" type="text/css" href="/assets/css/persianDatepicker-default.css" />
    <script type="text/javascript" src="/assets/js/persian-date.min.js"></script>
    <script type="text/javascript" src="/assets/js/persian-datepicker.min.js"></script>

    <script src="/assets/js/admin-js.js"></script>

    <!-- Custom Theme Scripts -->
    <script src="/assets/js/custom.js"></script>

    @yield('custom-footer')


</body>

</html>
