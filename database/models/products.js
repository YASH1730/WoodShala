const { default: mongoose } = require("mongoose");
const { stringify } = require("nodemon/lib/utils");

const product = mongoose.Schema({
    SKU : { type : String, unique: true},
    product_title : { type : String},
    category_name : { type : String},
    category_id : { type : String},
    sub_category_name : { type : String},
    sub_category_id : {type : String},
    product_description : {type : String},
    seo_title : { type : String},
    seo_description : { type : String},
    seo_keyword : { type : String},
    product_image : { type : Array, default : []},
    featured_image : { type : String},
    mannequin_image : { type : String},
    specification_image : { type : String},
    primary_material : { type : String},
    warehouse : {type : Array, default : []},
    primary_material_name : { type : String},
    length_main : { type : Number, default : 0, default : 0},
    breadth : { type : Number, default : 0, default : 0},
    height : { type : Number, default : 0, default : 0},
    bangalore_stock : { type : Number, default : 0, default : 0},
    jodhpur_stock : { type : Number, default : 0, default : 0},
    weight : { type : String},
    polish : { type : String},
    polish_name  : { type : String},
    hinge : { type : String},
    hinge_name  : { type : String},
    knob : { type : String},
    textile : { type : String},
    knob_name  : { type : String},
    textile_name  : { type : String},
    textile_type  : { type : String},
    handle : { type : String},
    handle_name  : { type : String},
    door : { type : String},
    door_name  : { type : String},
    fitting : { type : String},
    fitting_name : { type : String},
    selling_points : { type : Array},
    top_size : {type : Number, default : 0},
    dial_size : { type : Number, default : 0},
    seating_size_width : { type : Number, default : 0},
    seating_size_depth : { type : Number, default : 0},
    seating_size_height : { type : Number, default : 0},
    weight_capacity : { type : String},
    fabric : { type : String},
    fabric_name : { type : String},
    wall_hanging : { type : Boolean},
    assembly_required : { type : String},
    assembly_part : { type : Number, default : 0},
    legs : { type : String},
    mirror : { type : String},
    mirror_length : { type : String},
    mirror_width : { type : String},
    silver : { type : String},
    silver_weight : { type : Number, default : 0},
    joints : { type : String},
    upholstery : { type : String},
    wheel : { type : String},
    trolley : { type : String},
    trolley_material : { type : String},
    rotating_seats : { type : Boolean},
    eatable_oil_polish : { type : Boolean},
    no_chemical : { type : Boolean},
    straight_back : { type : Boolean},
    lean_back : { type : Boolean},
    weaving : { type : Boolean},
    knife : { type : Boolean},
    not_suitable_for_Micro_Dish : { type : Boolean},
    tilt_top : { type : Boolean},
    inside_compartments : { type : Boolean},
    stackable : { type : Boolean},
    MRP : { type : Number, default : 0},
    tax_rate : { type : Number, default : 0},
    selling_price : { type : Number, default : 0},
    showroom_price : { type : Number, default : 0},
    discount_limit : { type : Number, default : 0},
    polish_time: { type : String},
    manufacturing_time: { type : String},
    status : { type : Boolean},
    returnDays : {type : Number, default : 0},
    COD : {type : Boolean},
    returnable : {type : Boolean},
    drawer: {type : String},
    drawer_count: {type : Number, default : 0},
    mobile_store : {type : Boolean, default : true},
    online_store : {type : Boolean, default : true},
    range : {type : String},
    back_style : {type : String},
    package_length : {type : Number, default : 0},
    package_height : {type : Number, default : 0},
    package_breadth : {type : Number, default : 0},
    ceramic_drawers : {type : Boolean},
    ceramic_tiles : {type : Boolean},
    quantity : {type : Number, default : 0},
    unit : {type : String},
    variation_array: {type : Array, default : []},
    assembly_level : {type : String},
    warehouse_name : {type : String},
    continue_selling : {type : Boolean, default : true}
})

module.exports = mongoose.model('products',product);