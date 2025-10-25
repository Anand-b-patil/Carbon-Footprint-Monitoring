package com.nutrino.carbonfootprint.presentation.state

import com.nutrino.carbonfootprint.data.remote.facilities.FacilityResponse

sealed class FacilitiesUIState {
    object Idle : FacilitiesUIState()
    object Loading : FacilitiesUIState()
    data class Success(val data: List<FacilityResponse>? = null) : FacilitiesUIState()
    data class Error(val error: String) : FacilitiesUIState()
}
