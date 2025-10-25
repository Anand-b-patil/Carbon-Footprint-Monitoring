package com.nutrino.carbonfootprint.presentation.state

import com.nutrino.carbonfootprint.data.remote.facilities.FacilityResponse

sealed class CreateFacilityUIState {
    object Idle : CreateFacilityUIState()
    object Loading : CreateFacilityUIState()
    data class Success(val data: FacilityResponse? = null) : CreateFacilityUIState()
    data class Error(val error: String) : CreateFacilityUIState()
}
