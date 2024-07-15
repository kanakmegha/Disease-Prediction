$(document).ready(function() {
    // Dummy symptoms data (replace with actual data from your backend)
    const symptomsData = [
        'itching', 'skin_rash', 'nodal_skin_eruptions', 'continuous_sneezing', 'shivering',
        'chills', 'joint_pain', 'stomach_pain', 'acidity', 'ulcers_on_tongue', 'muscle_wasting',
        'vomiting', 'burning_micturition', 'spotting_ urination', 'fatigue', 'weight_gain', 
        'anxiety', 'cold_hands_and_feets', 'mood_swings', 'weight_loss', 'restlessness',
        'lethargy', 'patches_in_throat', 'irregular_sugar_level', 'cough', 'high_fever',
        'sunken_eyes', 'breathlessness', 'sweating', 'dehydration', 'indigestion', 'headache',
        'yellowish_skin', 'dark_urine', 'nausea', 'loss_of_appetite', 'pain_behind_the_eyes',
        'back_pain', 'constipation', 'abdominal_pain', 'diarrhoea', 'mild_fever', 'yellow_urine',
        'yellowing_of_eyes', 'acute_liver_failure', 'fluid_overload', 'swelling_of_stomach',
        'swelled_lymph_nodes', 'malaise', 'blurred_and_distorted_vision', 'phlegm',
        'throat_irritation', 'redness_of_eyes', 'sinus_pressure', 'runny_nose', 'congestion',
        'chest_pain', 'weakness_in_limbs', 'fast_heart_rate', 'pain_during_bowel_movements',
        'pain_in_anal_region', 'bloody_stool', 'irritation_in_anus', 'neck_pain', 'dizziness',
        'cramps', 'bruising', 'obesity', 'swollen_legs', 'swollen_blood_vessels',
        'puffy_face_and_eyes', 'enlarged_thyroid', 'brittle_nails', 'swollen_extremeties',
        'excessive_hunger', 'extra_marital_contacts', 'drying_and_tingling_lips',
        'slurred_speech', 'knee_pain', 'hip_joint_pain', 'muscle_weakness', 'stiff_neck',
        'swelling_joints', 'movement_stiffness', 'spinning_movements', 'loss_of_balance',
        'unsteadiness', 'weakness_of_one_body_side', 'loss_of_smell', 'bladder_discomfort',
        'foul_smell_of urine', 'continuous_feel_of_urine', 'passage_of_gases',
        'internal_itching', 'toxic_look_(typhos)', 'depression', 'irritability',
        'muscle_pain', 'altered_sensorium', 'red_spots_over_body', 'belly_pain',
        'abnormal_menstruation', 'dischromic _patches', 'watering_from_eyes',
        'increased_appetite', 'polyuria', 'family_history', 'mucoid_sputum',
        'rusty_sputum', 'lack_of_concentration', 'visual_disturbances',
        'receiving_blood_transfusion', 'receiving_unsterile_injections', 'coma',
        'stomach_bleeding', 'distention_of_abdomen', 'history_of_alcohol_consumption',
        'fluid_overload.1', 'blood_in_sputum', 'prominent_veins_on_calf', 'palpitations',
        'painful_walking', 'pus_filled_pimples', 'blackheads', 'scurring', 'skin_peeling',
        'silver_like_dusting', 'small_dents_in_nails', 'inflammatory_nails', 'blister',
        'red_sore_around_nose', 'yellow_crust_ooze'
    ];

    // Dynamically populate Select2 dropdown with symptoms
    const selectSymptoms = $('#symptoms');
    symptomsData.forEach(symptom => {
        selectSymptoms.append(`<option value="${symptom}">${symptom}</option>`);
    });

    // Initialize Select2 with options
    selectSymptoms.select2({
        placeholder: 'Select symptoms (type to search)',
        allowClear: true,
        multiple: true,
        tags: true,
        tokenSeparators: [',', ' '],
        createTag: function(params) {
            var term = $.trim(params.term);
            if (term === '') {
                return null;
            }
            return {
                id: term,
                text: term,
                newTag: true
            };
        }
    });

    // Update hidden input with selected symptoms
    selectSymptoms.on('change', function() {
        var selectedSymptoms = selectSymptoms.val();
        $('#symptomInput').val(selectedSymptoms.join(', '));
    });

    // Prevent form submission and handle submission via AJAX
    $('#symptomForm').on('submit', function(event) {
        event.preventDefault();
        var formData = new FormData(this);
        var symptoms = formData.getAll('symptoms[]');
        
        // AJAX POST request to predict endpoint
        fetch('/predict', {
            method: 'POST',
            body: new URLSearchParams(symptoms.map(s => ['symptoms[]', s])),
        })
        .then(response => response.json())
        .then(data => {
            if (data.prediction) {
                $('#result').html(`<h3>Predicted Disease: ${data.prediction}</h3>`);
            } else if (data.error) {
                $('#result').html(`<h3>Error: ${data.error}</h3>`);
            }
        })
        .catch(error => {
            $('#result').html(`<h3>Error: ${error.message}</h3>`);
        });
    });
});
