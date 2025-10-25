package com.nutrino.carbonfootprint.domain.usecase

import com.nutrino.carbonfootprint.data.remote.facilities.CreateFacilityRequest
import com.nutrino.carbonfootprint.data.remote.facilities.FacilityResponse
import com.nutrino.carbonfootprint.data.state.ResultState
import com.nutrino.carbonfootprint.domain.repository.FacilityRepository
import kotlinx.coroutines.flow.Flow
import javax.inject.Inject

class GetFacilitiesUseCase @Inject constructor(
    private val facilityRepository: FacilityRepository
) {
    suspend operator fun invoke(): Flow<ResultState<List<FacilityResponse>>> {
        return facilityRepository.getFacilities()
    }
}
