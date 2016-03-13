/* All of the things
 * Joseph Jaafari
 * March 10, 2016
 */
var lookup = function(zip) {
        //borrowed from http://docs.cartodb.com/cartodb-platform/cartodb-js/sql/
        var sql = new cartodb.SQL({
            user: 'josephjaafari'
        });

        sql.execute("SELECT a.display_name, b.zip, a.lat as uscis_lat, a.lng as uscis_lng, (ST_Distance(ST_POINT(a.lng::float,a.lat::float)::geography,ST_POINT(b.lng::float, b.lat::float)::geography) / 1609.34) as distance FROM uscis_locations a JOIN uscis_data b ON a.id = b.uscis_id WHERE zip = {{zip}}", {
            zip: zip
        })
            .done(function(data) {
                var results = data.rows[0]
                $("#closestLocation").html(results.display_name);
                $("#waitTime").html(results.wait_time_years + " years and " + results.wait_time_months + " months");
                $("#distance").html(parseInt(results.distance) + " miles");
            })
            .error(function(errors) {
                // errors contains a list of errors
                console.log("errors:" + errors);
            });
    },
    map;

$(document).ready(function() {

    $("body").on("click", "#calc", function() {
        var zip = parseFloat($("#zipCode").val());

        lookup(zip);
    });


});