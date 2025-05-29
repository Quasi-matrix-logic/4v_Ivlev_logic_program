let original_log = console.log;
let output = document.getElementById("text_div");
output.value = "";
console.log = function (...x) {
   original_log.apply(null, x);
   for (const element of x) {
      if (typeof element == 'object') {
         output.value += JSON.stringify(element);
      } else {
         output.value += element;
      }
      output.value += " ";
   }
   output.value += "\n";
};


const symb_imp = "\u2192";
//const symb_equivalence = "\u2194";  //equivalence as one symbol
const symb_equivalence = "\u2190"+"\u2192"; 
const symb_n_subset = "\u2284";
const symb_subset = "\u2282";


const symb_p = 'p'; 

let logic;

// c 0   b 1   d 2   e 3   f 4   g 5   h 6   i 7   a 8

//console.log("Символ необходимости: \u25FB");
//console.log("Символ возможности: \u25C7");
//DEFINITIONS of: NEG_A ; A_impl_B ; L_A ; M_A

//NEGATION DEFINITION   NEG_A
// 5 means error
const ARn = [4, 3, 2, 1];
/**
 * negation function
 * @param {*} x 
 * @returns 
 */
function n(x) {    // function of negation
   if (x < 5 & x > 0) {
      return ARn[x - 1];
   } else {
      console.log("ERROR NEGATION  x: ", x);
   }
}

//IMPL DEFINITION   value of impl(x, y)
const AR_Impl = [
   [4, 3, 2, 1],
   [4, 10, 2, 2],
   [4, 10, 10, 3],
   [4, 4, 4, 4]
];  //table for impl (+) (0) (-)

/**
 * implication
 * @param {*} k 
 * @param {*} x 
 * @param {*} y 
 * @returns 
 */
function impl(k, x, y) {
   if (x < 5 & x > 0 & y < 5 & y > 0) {
      let v = AR_Impl[4 - x][4 - y];
      if (v < 10) {
         return v;
      } else {
         if (k == 0) {
            return 4;
         } else { return 3; }
      };
   } else { console.log("ERROR impl   x =", x, " y=", y); }
};  // end of Impl_definition

//  L   DEFINITION //10 is f and 11 is t
// definition of modal operator L (box). The operator also known as necessity.
const AR_L = {
   Sc: [1, 1, 1, 4],
   Sb: [1, 2, 2, 4],
   Sd: [2, 2, 2, 3],
   Se: [2, 1, 1, 3],
   Sf: [10, 1, 1, 11],
   Sg: [10, 2, 2, 11],
   Sh: [1, 10, 10, 4],
   Si: [2, 10, 10, 3],
   Sa: [10, 10, 10, 11],
};

/**
 * modal operator L (box). The operator also known as necessity.
 * @param {*} k 
 * @param {*} x 
 * @returns 
 */
function L(k, x) {
   if (x < 5 & x > 0) {
      let v = AR_L[logic][x - 1];    //switch Sx here !
      switch (v) {
         default:
            console.log("switch L default");
            break;
         case 1:
            return 1;
         case 2:
            return 2;
         case 3:
            return 3;
         case 4:
            return 4
         case 10:  //is f
            if (k == 0) { return 1; } else { return 2; }
         case 11:   //is t
            if (k == 0) { return 4; } else { return 3; }
      }
   } else { console.log("ERROR L   x =", x) };
}; //end of function


//  M h  DEFINITION
// definition of modal operator M (diamond). The operator also known as possibility.
const AR_M = {
   Sc: [1, 4, 4, 4],
   Sb: [1, 3, 3, 4],
   Sd: [2, 3, 3, 3],
   Se: [2, 4, 4, 3],
   Sf: [10, 4, 4, 11],
   Sg: [10, 3, 3, 11],
   Sh: [1, 11, 11, 4],
   Si: [2, 11, 11, 3],
   Sa: [10, 11, 11, 11],
};

/**
 * modal operator M (diamond). The operator also known as possibility.
 * @param {*} k 
 * @param {*} x 
 * @returns 
 */
function M(k, x) {
   if (x < 5 & x > 0) {
      let v = AR_M[logic][x - 1];  //switch Sx here !
      switch (v) {
         default:
            console.log("switch M default");
            break;
         case 1:
            return 1;
         case 2:
            return 2;
         case 3:
            return 3;
         case 4:
            return 4;
         case 10:
            if (k == 0) { return 1; } else { return 2; }
         case 11:
            if (k == 0) { return 4; } else { return 3; }
      }
      // if (v < 10) {
      //    return v;
      // } else {
      //    if (k == 0) {
      //       return 4;
      //    } else { return 3; }
      // };

   } else { console.log("ERROR M   x =", x) };
};  //end of M function

/**
 * change 0 to L   and 1 to M
 * @param {number} x 0 or 1
 * @returns {string} L or M
 */
function change0L1M(x) {
   switch (x) {
      default:
         console.log("switch changeOL1M error");
         break;
      case 0:
         return "L";
      case 1:
         return "M";
   } //end of switch
}//end of change0L1M


/**
 * translate modalities from 01arrays to LM prefixes
 * @param {number[]} A 
 * @returns {string[]}
 */
function text(A) {
   // let prefA = A.reverse();
   // let q = 0;
   // q = prefA.map(x => change0L1M(x));
   // return q;
   let t = [];
   for (i = 0; i < A.length; i++) {
      t.push(A[A.length - 1 - i]);
   }
   for (i = 0; i < t.length; i++) {
      if (t[i] == 0) { t[i] = "\u25FB"; } else {  //browser  recognize \u25FB as "box"
         if (t[i] == 1) { t[i] = "\u25C7"; } else {  // \u25C7 
            if (t[i] == 8) { t[i] = "--"; } else {
               console.log("text error");
            }
         }
      }
   }
   return t;
};


// FIXME: tests should actually test the implementations, not just output to the console
/**
 * Test the implementation of implication
 * @param {number} k 
 */
function test_impl(k) {
   console.log("k:", k)
   for (let i = 1; i < 5; i++) {
      console.log(impl(k, i, 4), impl(k, i, 3), impl(k, i, 2), impl(k, i, 1));
   }
};

/**
 * Test the implementation of L, implication and negation
 */

/**
 * Show the array of modalities
 */
function show_mod() {
   console.log("      show    final array");
   for (let i = 0; i < mod.length; i++) {  // 
      // let m1 = "";
      // for(let j = 0; j < mod[i].length; j++){
      //    m1 = m1+" "+mod[i][j];
      // }
      // console.log(m1);
      console.log("i=", i, " ", mod[i]);
   }
}


function START_function(start) {
   let banner = 0;

   // HTML selectors

   // SIZE OF ARRAYS  and NUMBER OF MODALITES
   let selector1 = document.getElementById("selector_length_id");  //length of modality pattern
   let n0 = selector1.value - 1;  //n0 is max length of modality
   let ng = 2 * n0; //2^(ng+2) ng+2 is number of variated cases

   let selector1_calc = document.getElementById("selector_length_calc_id");  //length of modality pattern
   if(start == 1){
   let n0 = selector1_calc.value - 1;  //n0 is max length of modality
   let ng = 2 * n0; //2^(ng+2) ng+2 is number of variated cases
   };


   // существует 9 логик Ивлева, они обозначаются: Sc   Sb    Sd    Se    Sf    Sg    Sh    Si    Sa .
   let selector2 = document.getElementById("selector_logic_id"); //logic
   logic = selector2.value;

   let selector2_calc1 = document.getElementById("selector_logic_calc1_id"); //logic1 for Calc_function
   let logic1 = selector2_calc1.value;
   let selector2_calc2 = document.getElementById("selector_logic_calc2_id"); //logic2 for Calc_function
   let logic2 = selector2_calc2.value;

   let selector3 = document.getElementById("selector_type_of_formulas_id"); //type of formulae
   let type_of_formulas = selector3.value;  //implication or equivalence:  ->  or <->     (1 is ->)    (2 is <->)   (3 is |->)  
   
   let print_false_checkbox = document.getElementById("print_false_or_not_id");
   let print_false_or_not = print_false_checkbox.checked ? 1 : 0;  // "print list of implication without implication with value F" _  OR  _ "NOT"   ? 
   console.log("print_false_or_not = ", print_false_or_not);

   let information_checkbox = document.getElementById("information_id");
   let print_information = information_checkbox.checked ? 1 : 0;  // "print program information is extra   end  output in program notation   ? 
   console.log("print_information = ", print_information);

   let information_checkbox_calc = document.getElementById("information_calc_id");
   let print_information_calc = information_checkbox_calc.checked ? 1 : 0;  // "print program information is extra   end  output in program notation   ? 
   console.log("print_information = ", print_information_calc);
   
   

   output.value = "";

   console.log(" ");
   console.log("                  PROGRAM STARTED");
   console.log(" ");

   
   //CREATE ARRAY  tree  (array of evaluation quasi-function)
   let AR = [[0, 0], [1, 0], [0, 1], [1, 1]]; //origin of array
   let l = AR.length;
   if(print_information == 1){      console.log("length of origin:", l);};
   for (let n = 0; n < ng; n++) {
      for (let i = 0; i < l; i++) {  //to double array 
         AR[i].push(0);
         let elem = []; //copy of AR[i] to replace ended element
         for (let j = 0; j < AR[i].length; j++) {
            elem.push(AR[i][j]);
         }
         elem[elem.length - 1] = 1; // to replace
         AR.push(elem);
      }
      if(print_information == 1){   console.log(AR);};
      l = AR.length;
   };

   //CREATE ARRAY  of modalities  (0 is L)  and   (1 is M)
   let mod = [[0], [1]];  // , [0, 0], [0, 1], [1, 0], [1, 1]]; //origin of modality array
   let l1 = mod.length;
   let level1 = 0;
   let previous_l = 0;
   for (let n = 0; n < n0; n++) {  //modality of each length
      //level1 = 6*Math.pow(3, n);
      // if(print_information == 1){console.log("level1: ", level1, "n=", n);};
      previous_l = mod.length;
      for (let i = level1; i < l1; i++) {  //to create modality of new length
         //AR[i].push(0);
         let elem1 = []; //copy of mod[i] to add ended element
         let elem2 = []; //copy of mod[i] to add ended element
         for (let j = 0; j < mod[i].length; j++) { //to copy
            elem1.push(mod[i][j]);
            elem2.push(mod[i][j]);
         }
         elem1.push(0); // to add
         elem2.push(1);
         mod.push(elem1);
         mod.push(elem2);
      }
      level1 = previous_l; // new values for scope for add (bound of circle) 
      l1 = mod.length;
   };

   //show_mod(mod);  //call -> show all modalities


   if(print_information == 1){         console.log("length of Array: ", AR.length);};
   // console.log("length of element: ", AR[1].length);
   if(print_information == 1){         console.log("number of modalities : ", mod.length);};
   

   

   /**
    * calculate current modality (variable (e) only for mod_B)
    * @param {*} v_c 
    * @param {*} i 
    * @param {*} comAB 
    * @param {*} v_tree 
    * @param {*} e 
    * @returns 
    */
   function calc_mod_f(v_c, i, comAB, v_tree, e) {
      let box1 = 0;
      let box2 = 0;
      let switch_variable = 10;
      switch_variable = comAB[i - e];
      box1 = i - e;
      box2 = comAB;
      switch (switch_variable) {
         default:
            console.log("switch calc_mod_f default  i-e=", box1, "comAB=", comAB, "banner", banner);
            break;
         case 0:
            return L(v_tree[i], v_c);
         case 1:
            return M(v_tree[i], v_c);
         case 8:
            return neg(v_c); //negation function    //attention: "8" is negation "modality".
      } //end of switch
      // if (comAB[i] == 0) {
      //    return L(v_t[i], v_c);
      // } else {
      //    if (comAB[i] == 1) {
      //       return M(v_t[i], v_c);
      //    } else { console.log("calc_mod_f_M  error"); }
      // }
   }; //end of calc_mod_f

   /**
    * Evaluation algorithm
    * @param {*} tree 
    * @param {*} p 
    * @param {*} A 
    * @param {*} B 
    * @returns 
    */
   function main_calc_f(tree, p, A, B) {
      let cl = A.length - B.length;
      banner = 0;  //to find error
      let value_common = p;
      let b11 = 0;  //to find error
      let b12 = 0;
      let value_A = 0;
      let value_B = 0;
      let common_A_B = [];  //common part of modalities x and y
      for (let i = 0; i < Math.min(A.length, B.length); i++) { //to create array int (common part of modalites)
         if (A[i] == B[i]) {
            common_A_B.push(A[i])
         } else {
            break;
         }
      }  //end of for1
      //banner++;
      //console.log("tree:", tree, "p=", p, " A:", A," B:", B, " common_A_B:", common_A_B);
      for (let i = 0; i < common_A_B.length; i++) { //to find value of common part of modalities A and B
         value_common = calc_mod_f(value_common, i, common_A_B, tree, 0);
      }  //end of for2
      //banner++;
      //   console.log("value_common: ", value_common);
      let com_length = common_A_B.length; //just define length of common as variable
      value_A = value_common; //to start calculate value_A and value_B with value_common
      value_B = value_common;
      for (let i = com_length; i < A.length; i++) { //to fide value of A 
         value_A = calc_mod_f(value_A, i, A, tree, 0);
      }  //end of for3
      //banner++;
      //   console.log("value_A: ", value_A);
      let c2 = B.length - common_A_B.length //length of B-com
      let c3 = A.length - common_A_B.length //
      for (let i = A.length; i < A.length + c2; i++) { //to find value of B 
         value_B = calc_mod_f(value_B, i, B, tree, c3); // attention! here (i) is i_of_tree  
      }  //end of for4
      //banner++; 
      let result_of_main = [value_common, value_A, value_B, common_A_B];
      return result_of_main;  // result of main_calc_f is [value_common, value_A, value B]
   }; //and of main_calc_f


   // let r = main_calc_f(AR[5], 2, [0, 1, 0, 0, 1, 1, 1], [0, 1, 0, 0, 0, 1, 1]);  //to test function a1()
   // console.log("result_of_main=", r)


   /**
    * calculate value of implication betwen patterns A and B. Here pattern is arrays of 0, 1.
    * @param {number[]} A pattern (array of 0 and 1)
    * @param {number[]} B pattern (array of 0 and 1)
    */
   function A_impl_B(A, B) {
      let TF_impl_A_B = "True";  //define values of TFimpl is T 
      let TF_impl_B_A = "True";
      let proof_right = 0;
      let proof_left = 0;
      for (let p = 1; p < 5; p++) {  //check all scope of (p) and (AR[i])
         for (let i = 0; i < AR.length; i++) {
            let main_c = 0;  //variable for value of main_calc_f
            main_c = main_calc_f(AR[i], p, A, B);
            let right_impl = impl(1, main_c[1], main_c[2]);
            let left_impl = impl(1, main_c[2], main_c[1]);
            if (right_impl < 3) {
               TF_impl_A_B = "False";
               if (proof_right == 0) {
                  proof_right = [p, AR[i]];
               }
            };
            // if (left_impl < 3) {
            //    TF_impl_B_A = "False";
            //    if (proof_left == 0) { 
            //       proof_left = [p, AR[i]];
            //    }
            // }; //error here!
         }
      }
      //console.log("A:",A," B:",B,"  (A->B) is:",TF_impl_A_B,"  (B->A) is:", TF_impl_B_A, "proof: ", proof_right, " ", proof_left);
      //console.log("                 ");          
      //previous console.log is full program information
      if (TF_impl_A_B == "True") {
         if (print_false_or_not == 0) {
            console.log(text(A).join('')+symb_p, symb_imp, text(B).join('')+symb_p, " ", "is: ", TF_impl_A_B);
            if(print_information == 1){console.log(A.join(''), symb_imp, B.join(''), "is: ", TF_impl_A_B, " ", proof_right)};
         };
      }
      if (print_false_or_not == 1) {
         console.log(text(A).join('')+symb_p, symb_imp, text(B).join('')+symb_p, "is: ", TF_impl_A_B);
         if(print_information == 1){console.log(A.join(''), symb_imp, B.join(''), "is: ", TF_impl_A_B, " ", proof_right)};
      };

      //console.log(text(A).join(''),"->",text(B).join(''), "is: ", TF_impl_B_A," ",proof_left);
   } //end of A_impl_B

   /**
    * calculate value of equivalence betwen patterns A and B
    * @param {number[]} A pattern (array of 0 and 1)
    * @param {number[]} B pattern (array of 0 and 1)
    */
   function A_eq_B(A, B) {
      let TF_impl_A_B = "True";  //define values of TFimpl is T 
      let TF_impl_B_A = "True";
      let proof_right = 0;
      let proof_left = 0;
      for (let p = 1; p < 5; p++) {  //check all  -> scope of (p) and (AR[i])
         for (let elem of AR) {
            let main_c = 0;  //variable for value of main_calc_f
            main_c = main_calc_f(elem, p, A, B);
            let right_impl = impl(1, main_c[1], main_c[2]);
            if (right_impl < 3) {
               TF_impl_A_B = "False";
               if (proof_right == 0) {
                  proof_right = [p, elem];
               }
            };
         }
      }
      for (let p = 1; p < 5; p++) {  //check all  <- scope of (p) and (AR[i])
         for (let i = 0; i < AR.length; i++) {
            let main_c = 0;  //variable for value of main_calc_f
            main_c = main_calc_f(AR[i], p, A, B);
            let left_impl = impl(1, main_c[2], main_c[1]);
            if (left_impl < 3) {
               TF_impl_B_A = "False";
               if (proof_left == 0) {
                  proof_left = [p, AR[i]];
               }
            };
         }
      }

      if (TF_impl_A_B == "True" & TF_impl_B_A == "True") {  // for print eq
         if (print_false_or_not == 0) {
            console.log(text(A).join('')+symb_p, symb_equivalence, text(B).join('')+symb_p, "values are: ", " |A"+symb_imp+"B|=", TF_impl_A_B,"  and   ", " |B"+symb_imp+"A|=", TF_impl_B_A);
            if(print_information == 1){console.log(A.join(''), symb_equivalence, B.join(''), "values are: ", " |A"+symb_imp+"B|=", TF_impl_A_B, " |B"+symb_imp+"A|=", TF_impl_B_A, " ", proof_right, " ", proof_left);};
         }
      }//end of print
      if (print_false_or_not == 1) {
         console.log(text(A).join('')+symb_p, symb_equivalence, text(B).join('')+symb_p, " values are: ", " |A"+symb_imp+"B|=", TF_impl_A_B,"  and   ", " |B"+symb_imp+"A|=", TF_impl_B_A);
            if(print_information == 1){console.log(A.join(''), symb_equivalence, B.join(''), "values are: ", " |A"+symb_imp+"B|=", TF_impl_A_B, " |B"+symb_imp+"A|=", TF_impl_B_A, " ", proof_right, " ", proof_left);};
      };
   }//end of A_eq_B

   /**
    * 
    * @param {number[]} A pattern (array of 0 and 1)
    * @param {number[]} B pattern (array of 0 and 1)
    */
 
   /**
    * calculate value of one side implication betwen patterns A |-> B
    * @param {number[]} A pattern (array of 0 and 1)
    * @param {number[]} B pattern (array of 0 and 1)
    */
   function A_one_side_B(A, B) {
      let TF_impl_A_B = "True";  //define values of TFimpl is T 
      let TF_impl_B_A = "True";
      let proof_right = 0;
      let proof_left = 0;
      for (let p = 1; p < 5; p++) {  //check all  -> scope of (p) and (AR[i])
         for (let i = 0; i < AR.length; i++) {
            let main_c = 0;  //variable for value of main_calc_f
            main_c = main_calc_f(AR[i], p, A, B);
            let right_impl = impl(1, main_c[1], main_c[2]);
            if (right_impl < 3) {
               TF_impl_A_B = "False";
               if (proof_right == 0) {
                  proof_right = [p, AR[i]];
               }
            };
         }
      }
      for (let p = 1; p < 5; p++) {  //check all  <- scope of (p) and (AR[i])
         for (let i = 0; i < AR.length; i++) {
            let main_c = 0;  //variable for value of main_calc_f
            main_c = main_calc_f(AR[i], p, A, B);
            let left_impl = impl(1, main_c[2], main_c[1]);
            if (left_impl < 3) {
               TF_impl_B_A = "False";
               if (proof_left == 0) {
                  proof_left = [p, AR[i]];
               }
            };
         }
      }

      if (TF_impl_A_B == "True" & TF_impl_B_A == "False") {  // for print eq
         if (print_false_or_not == 0) {
            console.log(text(A).join('')+symb_p, "|",symb_imp, text(B).join('')+symb_p, "values are: ", " |A"+symb_imp+"B|=", TF_impl_A_B, " |B"+symb_imp+"A|=", TF_impl_B_A);
            if(print_information == 1){console.log(A.join(''), "|",symb_imp, B.join(''), "values are: ", " |A"+symb_imp+"B|=", TF_impl_A_B, " |B"+symb_imp+"A|=", TF_impl_B_A, " ", proof_right, " ", proof_left);}
         }
      };   
      if (print_false_or_not == 1) {
        if (TF_impl_A_B == "True" & TF_impl_B_A == "False") {  // for print eq 
            console.log(text(A).join('')+symb_p, "|",symb_imp, text(B).join('')+symb_p, "is: True");
            if(print_information == 1){console.log(A.join(''), "|",symb_imp, B.join(''), "values are: ", " |A"+symb_imp+"B|=", TF_impl_A_B, " |B"+symb_imp+"A|=", TF_impl_B_A, " ", proof_right, " ", proof_left);}
                              }else{//end of print TRUE
                              console.log(text(A).join('')+symb_p, symb_equivalence, text(B).join('')+symb_p, " values are: ", " |A"+symb_imp+"B|=", TF_impl_A_B,"  and   ", " |B"+symb_imp+"A|=", TF_impl_B_A);
                              if(print_information == 1){console.log(A.join(''), symb_equivalence, B.join(''), "values are: ", " |A"+symb_imp+"B|=", TF_impl_A_B, " |B"+symb_imp+"A|=", TF_impl_B_A, " ", proof_right, " ", proof_left);};  
                              } // end of print False  (print like equivalence)
                                    } // FIXME: should it be "|->"?
   }//end of A_one_side_B


   function subset(logic1, logic2) {
   let impl_1_2 = 0;
      let mi = 0; //for i and j
      let mj = 0;
      for(let i = 0; i < mod.length; i++){    //a 8   h6
      for(let j = 0; j < mod.length; j++){
      let x_f = 0;
      let y_f = 0;
      
      logic = logic1;  
      x_f = return_A_impl_B(mod[i], mod[j]);
      logic = logic2;
      y_f = return_A_impl_B(mod[i], mod[j]);
      if(x_f == 0 & y_f==1){if(impl_1_2 == 0){A_impl_B(mod[i], mod[j]);}
         impl_1_2 = 1;
         mi = i;
         mj = j;
         } //end of if
         }
      } // end of circls
      //if(impl_1_2 == 0){console.log("Yes");}else{console.log("Yes");}
      if(impl_1_2 == 0){console.log("G("+logic1+")", symb_subset ,"G("+logic2+")");}else{
         console.log("G("+logic1+")", symb_n_subset ,"G("+logic2+")");
         console.log("output of counterexample:");   //for output of counterexample
         logic = logic2;   
         print_false_or_not = 1;
         print_information = 1;
         A_impl_B(mod[mi], mod[mj]);                                                }
      }  //end of subset

      // this function to return  array that meal implicatin  and [2] if is not implication
   function return_A_impl_B(A, B){  //"5" means implication symbol
   let formula = 0; // variable for formula AimplB
   let ff = 1; //return this if not implication 
   let tt = 0;
   let TF_impl_A_B = "T";  //defoult values of TFinpl is T 
   let TF_inpl_B_A = "T";
   let proof_right = 0;
   let proof_left = 0;
   for(let p = 1; p < 5; p++){  //chek all scoup of (p) and (AR[i])
   for(let i = 0; i < AR.length; i++){
      let main_c = 0;  //variable for value of main_calc_f
      main_c = main_calc_f(AR[i], p, A, B);
      let right_inpl = impl(1, main_c[1], main_c[2]);
      let left_impl = impl(1, main_c[2], main_c[1]); 
      if(right_inpl < 3){TF_impl_A_B = "F";
                         if(proof_right ==0){proof_right = [p, AR[i]];}   };
      }
      }
      if(TF_impl_A_B == "T"){
           //console.log(text(A).join(''),"->",text(B).join('')," ",A.join(''),"->",B.join(''), "is: ", TF_impl_A_B," ",proof_right);
           //formula = array_concatination(A, [5]);  //"5" means implication symbol
           //formula = array_concatination(formula, B);
           return tt;
         }else{return ff;}
         } //end of   return_A_inpl_B


                           //    START with 0 (patterns)   OR  1 (subset test)
   if(start == 0){  // patterns or inclusion
            console.log("                                         ");
            console.log("                        You have chosen logic:", logic);
      for (let i = 0; i < mod.length; i++) {
      for (let j = 0; j < mod.length; j++) {
         switch (type_of_formulas) {
            case "impl":
               A_impl_B(mod[i], mod[j]);
               break;
            case "eq":
               A_eq_B(mod[i], mod[j]);
               break;
            case "oneside_impl":
               A_one_side_B(mod[i], mod[j]);
               break;
         }
      }
   } //end of loop
}// end of if patterns or inclusion
   
   if(start == 1){
      console.log("Start subset testing");
      if(print_information_calc == 1){
      console.log("start = ", start);
      console.log("logic1 = ", logic1);
      console.log("logic2 = ", logic2);
      console.log("selector1_calc.value = ", selector1_calc.value);
      };
      console.log("     ");
      console.log("Result: ");
      subset(logic1, logic2);
   }




}; // end of START function (END OF PROGRAM) 



function test_function() {
   let banner = 0;

   // HTML selectors

   // SIZE OF ARRAYS  and NUMBER OF MODALITES
   let selector1_test = document.getElementById("selector_length_test_id");  //length of modality pattern
   let n0 = selector1_test.value - 1;  //n0 is max length of modality
   let ng = 2 * n0; //2^(ng+2) ng+2 is number of variated cases

   // существует 9 логик Ивлева, они обозначаются: Sc   Sb    Sd    Se    Sf    Sg    Sh    Si    Sa .
   let selector2_test = document.getElementById("selector_logic_test_id"); //logic
   logic = selector2_test.value;


   // let information_checkbox = document.getElementById("information_id");
   // let print_information = information_checkbox.checked ? 1 : 0;  // "print program information is extra   end  output in program notation   ? 
   // console.log("print_information = ", print_information);

   let information_checkbox_test = document.getElementById("information_test_id");
   let print_information = information_checkbox_test.checked ? 1 : 0;  // "print program information is extra   end  output in program notation   ? 
   console.log("print_information = ", print_information);

   

   output.value = "";

   console.log(" ");
   console.log("                  TEST AXIOM IS STARTED");
   console.log(" ");

   //CREATE ARRAY  tree  (array of evaluation quasi-function)
   let AR = [[0, 0], [1, 0], [0, 1], [1, 1]]; //origin of array
   let l = AR.length;
   if(print_information == 1){      console.log("length of origin:", l);};
   for (let n = 0; n < ng; n++) {
      for (let i = 0; i < l; i++) {  //to double array 
         AR[i].push(0);
         let elem = []; //copy of AR[i] to replace ended element
         for (let j = 0; j < AR[i].length; j++) {
            elem.push(AR[i][j]);
         }
         elem[elem.length - 1] = 1; // to replace
         AR.push(elem);
      }
      if(print_information == 1){   console.log(AR);};
      l = AR.length;
   };

   //CREATE ARRAY  of modalities  (0 is L)  and   (1 is M)
   let mod = [[0], [1]];  // , [0, 0], [0, 1], [1, 0], [1, 1]]; //origin of modality array
   let l1 = mod.length;
   let level1 = 0;
   let previous_l = 0;
   for (let n = 0; n < n0; n++) {  //modality of each length
      //level1 = 6*Math.pow(3, n);
      if(print_information == 1){console.log("level1: ", level1, "n=", n);};
      previous_l = mod.length;
      for (let i = level1; i < l1; i++) {  //to create modality of new length
         //AR[i].push(0);
         let elem1 = []; //copy of mod[i] to add ended element
         let elem2 = []; //copy of mod[i] to add ended element
         for (let j = 0; j < mod[i].length; j++) { //to copy
            elem1.push(mod[i][j]);
            elem2.push(mod[i][j]);
         }
         elem1.push(0); // to add
         elem2.push(1);
         mod.push(elem1);
         mod.push(elem2);
      }
      level1 = previous_l; // new values for scope for add (bound of circle) 
      l1 = mod.length;
   };

   //show_mod(mod);  //call -> show all modalities


   if(print_information == 1){         console.log("length of Array: ", AR.length);};
   // console.log("length of element: ", AR[1].length);
   if(print_information == 1){         console.log("number of modalities : ", mod.length);};



   

   console.log("                                         ");
   console.log("                    You have chosen logic:", logic);
   console.log("            here M is:", '\u25C7',"       L is:", '\u25FB', "    -- is:", '\u00AC'  );
      //console.log("Символ необходимости: \u25FB");
//console.log("Символ возможности: \u25C7");


                                       //Evaluation algoritm

let what = 2; // number of formula in the list
var x = 0;
let p = 1; // value of variable
let log = "";
for(let what = 1; what < 33; what++){
let stop_print = 0;
//let form = 1;
let result = "True";
//console.log("                       CHEK STARTED", "   formula №: ", what )
var img = "";
for(let p = 1; p < 5; p++){
//console.log("                       Chek p=", p)
for(let i = 0; i < AR.length; i++){
   log = "";
                              // list of cheked formuls  (this is in sircle)
   switch(what) {
      default:
         console.log("swith default");
         result = "empty";
         img = " ";
         break;
 case 1:
      x =  impl(AR[i][0],  L(AR[i][1], p)  , L(AR[i][2], L(AR[i][1], p)))  //L->LL  Axiom4
      img = "b1:  L->LL  ";
    break;
 case 2:
      x =  impl(AR[i][0]  , M(AR[i][3], L(AR[i][2], p))  ,  M(AR[i][1], p))  //ML->M 
      img = "b2:  ML->M   h2";
    break;
 case 3:
      x =  impl(AR[i][0],  M(AR[i][3], p)  , M(AR[i][2], L(AR[i][1], p)))  //M->ML
      img = "b3: M->ML    ";
    break;
 case 4:
      x =  impl(AR[i][0],  L(AR[i][3], p)  , L(AR[i][2], M(AR[i][1], p)))  //L->LM
      img = "b4: L->LM";
    break;
 case 5:
      x =  impl(AR[i][0]  , L(AR[i][3], M(AR[i][2], p))  ,  L(AR[i][1], p))  //LM->L 
      img = "b5: LM->L ";
    break;
 case 6:
      x =  impl(AR[i][0]  , M(AR[i][2], M(AR[i][1], p))  ,  M(AR[i][1], p))  //MM->M 
      img = "b6: MM->M ";
    break; 
 case 7:
      x =  impl(AR[i][0],  L(AR[i][1], p)  , L(AR[i][2], L(AR[i][1], p)))  //L->LL 
      img = "c1:  L->LL  (b1)";
    break;
 case 8:
      x =  impl(AR[i][0]  , M(AR[i][2], M(AR[i][1], p))  ,  M(AR[i][1], p))  //MM->M 
      img = "c2: MM->M  (b6)";
    break;
case 9:
      x =  impl(AR[i][0]  , M(AR[i][2], L(AR[i][1], p))  ,  L(AR[i][1], p))  //ML->M 
      img = "c3   ML->L  ->     ";
    break;
// case 10:
//       x =  impl(AR[i][0]  , M(AR[i][2], L(AR[i][1], p))  ,  p)  //ML->I 
//       img = " c3  ML-> I  ->         book typo";
    break;
case 10:
      x =  impl(AR[i][0],  M(AR[i][1], p)  , L(AR[i][2], M(AR[i][1], p)))  //M->LM
      img = "c4   M->LM  ,  (S5)";
    break;
case 11:
      x =  M(AR[i][2], M(AR[i][1], p))  //K
      img = "d1  MMa      i1 and first half of ";
    break;
case 12:
      x =  M(AR[i][2], L(AR[i][1], p))
      img = "d1 MLa                 d1 second half"   ;
    break;
case 13:
      x =  M(AR[i][2], M(AR[i][1], p))  //K
      img = "e1  MMa      i1 ";
    break;
     case 14:
      x =   impl(AR[i][0],  n(M(AR[i][1], p)),  M(AR[i][3], L(AR[i][2], p)) )   //K
      img = "e2  i2  --Ma-> MLa       ";
    break;
   case 15:
      x =   impl(AR[i][0],  L(AR[i][1], p),  M(AR[i][3], n(M(AR[i][2], p)) ) )      //K
      img = "e3  i3   La-> M--Ma       ";
      break;
   case 16:
      x =     M(  AR[i][0] ,  n(L(AR[i][1], p))  )   //K
      img = "e4   i4   M--La      ";
    break;
   case 17:
      x =  impl(AR[i][0],  M(AR[i][3], L(AR[i][1], p))    ,  impl(AR[i][2], p, L(AR[i][1], p))   )  // K
      img = "e5   f1   ML->(a->L)   Axiom f1"; 
    break;
    case 18:
      x =  impl(AR[i][0],  M(AR[i][4], L(AR[i][3], p))    ,  impl(AR[i][2], M(AR[i][1], p), p)   )  //K
      img = "e6   f2   ML->(M->a)   f2"    ;
    break;
    case 19:
      x =  impl(AR[i][0],    p    ,    impl(AR[i][2],     M(AR[i][4], n(p)),    L(AR[i][3], M(AR[i][1], p))  )   ) // K
      img = "e7   f3   a->(M--A->LM)  f3";
    break;
    case 20:
      x =  impl(AR[i][0],    n(p)    ,    impl(AR[i][3],     M(AR[i][1], p),    L(AR[i][2], M(AR[i][1], p))  )   ) //K
      img = "e8   f4   --a->(M->LM)  f4 ";
      break;
    case 21:
      x =  impl(AR[i][0],    p    ,    impl(AR[i][3],     n(L(AR[i][1], p)),    M(AR[i][2], L(AR[i][1], p))  )   ) //K
      img = "g1 a->(--L->ML)    "   ;
    break;
    case 22:
      x =  impl(AR[i][0],    n(p)    ,    impl(AR[i][4],     M(AR[i][3], p),    M(AR[i][2], L(AR[i][1], p))  )   )  //K
      img = "g2 --a->(M->ML)   ";
    break;
    case 23:
      x =  impl(AR[i][0],  L(AR[i][3], M(AR[i][4], p))    ,  impl(AR[i][2], p, L(AR[i][1], p))   ) 
      img = "g3 LM->(a->L)   ";
    break;
    case 24:
      x =  impl(AR[i][0],  L(AR[i][3], M(AR[i][1], p))    ,  impl(AR[i][2], M(AR[i][1], p), p)   )
      img = "g4 LM->(M->a)   ";
    break;
    case 25:
      x =  impl(AR[i][0],  L(AR[i][1], p)  , L(AR[i][2], L(AR[i][1], p)))  //L->LL  Axiom4
      img = "h1:  L->LL  ";
    break;
    case 26:
      x =  impl(AR[i][0]  , M(AR[i][3], L(AR[i][2], p))  ,  M(AR[i][1], p))  //ML->M 
      img = "h2   b2  ML->M   ";
    break;
    case 27:
      x =  impl(AR[i][0],  L(AR[i][3], p)  , L(AR[i][2], M(AR[i][1], p)))  //L->LM
      img = "h3   : L->LM";
    break;
    case 28:
      x =  impl(AR[i][0]  , M(AR[i][2], M(AR[i][1], p))  ,  M(AR[i][1], p))  //MM->M 
      img = "h4: MM->M  (b6)";
    break;
    case 29:
      x =  M(AR[i][2], M(AR[i][1], p))  //K
      img = "i1  MMa       ";
    break;
     case 30:
      x =   impl(AR[i][0],  n(M(AR[i][1], p)),  M(AR[i][3], L(AR[i][2], p)) )   //K
      img = "i2    --Ma-> MLa       ";
    break;
   case 31:
      x =   impl(AR[i][0],  L(AR[i][1], p),  M(AR[i][3], n(M(AR[i][2], p)) ) )      //K
      img = "i3     La-> M--Ma       ";
      break;
   case 32:
      x =     M(  AR[i][0] ,  n(L(AR[i][1], p))  )   //K
      img = "i4      M--La      ";
    break;
}
   
   log = log + "i="+ i +"  p="+p+ "  x="+ x + "   AR: " + AR[i];
   if(x < 3){
         if(stop_print==0){
            log = log + "  NOT ELEMENT   ";
            //console.log(log);
            result = "False";
            stop_print++;
         }
      //console.log("NOT ELEMENT   ", AR[i])
      //break;
   }
   //console.log(log) // for all (i) print
}
}//end of p sircle
console.log("                       ",img+"    value is:"+result);
if(print_information == 1){                     console.log(log);};
console.log("      "); //empty print for conviniense
//Remarkable example: p=1 for     let x = impl(AR[i][0], n(p), impl(AR[i][1], M(AR[i][2], p), M(AR[i][3], L(AR[i][4], p))));
} //end of what for()

} // end of test_function



