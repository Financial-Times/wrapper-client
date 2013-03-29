// https://docs.google.com/a/ft.com/spreadsheet/ccc?key=0AufhB2ctSMXVdGN0WXE4YzRNZ2daMmJjWkNHWlltMEE#gid=0
//
// Structure placeholders
//    <!--ft.code:metaTitle-->
//    <!--ft.code:metaDescription-->
//    <!--ft.code:metaKeywords-->
//    <!--ft.code:meta-->
//    <!--ft.code:head-->
//    <!--ft.code:css-->
//    <!--ft.code:js-->
//    <!--ft.code:foot-->
//    <!--ft.code:dfpSiteName-->
//    <!--ft.code:dfpZoneName-->

// Content placeholders
//    <!--ft.content:mainContentWell-->
//    <!--ft.content:rightRailContentWell-->
//    <!--ft.content:secondColumn->
//    <!--ft.content:heading-->
//    <!--ft.content:wide-->
//    <!--ft.content:header-->
//    <!--ft.content:navigation-->

//NOT implemented
//<!--ft.content:footer-->

exports.populate = function() {
    return {
        headWrapperCss: "", // what's this?
        footWrapperJs: "", // what's this?

        code: {
            metaTitle:"<title>Wrapper page title BLAH BLAH</title>",
            metaDescription:"A wrapper page blah blah",
            metaKeywords:"keyword1 keyword2",
            css:"<style type='text/css'>.mystyle {background-color:pink;}</style>",
            js:"<script>console.log('My head script')</script>",
            head:"", //??

            meta:"<meta name='other1' content='value1'/><meta name='other2' content='value2'/>", //other metadata tags, e.g. for tracking

            foot:"<script>console.log('My foot script')</script>",
            dfpSiteName:"dfpSiteName",
            dfpZoneName:"dfpSiteName"
        },
        content: {
            contentWell:"<div><p class='mystyle'>Main content well</p></div>",
            rightRailContentWell: "<div><p>Right hand content well</p></div>",
            secondColumn: "<div><p>Second column content well</p></div>",
            header: "<header>This is the header</header>",
            wide: "wide",
            navigation: "<nav>This is the navigation</nav>"

        }
    }
}