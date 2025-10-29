package com.nutrino.carbonfootprint.domain.usecase

import com.nutrino.carbonfootprint.data.remote.facilities.CreateFacilityRequest
import com.nutrino.carbonfootprint.data.remote.facilities.FacilityResponse
import com.nutrino.carbonfootprint.data.state.ResultState
import com.nutrino.carbonfootprint.domain.repository.FacilitiesRepository
import kotlinx.coroutines.flow.Flow
import javax.inject.Inject

class CreateFacilityNewUseCase @Inject constructor(
    private val facilitiesRepository: FacilitiesRepository
) {
    suspend operator fun invoke(facilityRequest: CreateFacilityRequest): Flow<ResultState<FacilityResponse>> {
        return facilitiesRepository.createFacility(facilityRequest)
    }
}

class GetFacilitiesNewUseCase @Inject constructor(
    private val facilitiesRepository: FacilitiesRepository
) {
    suspend operator fun invoke(): Flow<ResultState<List<FacilityResponse>>> {
        return facilitiesRepository.getFacilities()
    }
}
