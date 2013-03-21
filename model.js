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
        code: {
            metaTitle:"",
            metaDescription:"",
            metaKeywords:"",
            meta:"",
            head:"",
            css:"",
            js:"",
            foot:"",
            dfpSiteName:"",
            dfpZoneName:""
        },
        content: {

        }
    }
}