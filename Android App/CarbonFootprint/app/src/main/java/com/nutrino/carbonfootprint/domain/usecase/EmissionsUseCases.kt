package com.nutrino.carbonfootprint.domain.usecase

import com.nutrino.carbonfootprint.data.remote.emissions.EmissionResponse
import com.nutrino.carbonfootprint.data.remote.emissions.RecomputeEmissionsRequest
import com.nutrino.carbonfootprint.data.remote.emissions.RecomputeEmissionsResponse
import com.nutrino.carbonfootprint.data.state.ResultState
import com.nutrino.carbonfootprint.domain.repository.EmissionsRepository
import kotlinx.coroutines.flow.Flow
import javax.inject.Inject

class GetEmissionsUseCase @Inject constructor(
    private val emissionsRepository: EmissionsRepository
) {
    suspend operator fun invoke(
        from: String? = null,
        to: String? = null,
        limit: Int? = null,
        offset: Int? = null
    ): Flow<ResultState<List<EmissionResponse>>> {
        return emissionsRepository.getEmissions(from, to, limit, offset)
    }
}

class RecomputeEmissionsUseCase @Inject constructor(
    private val emissionsRepository: EmissionsRepository
) {
    suspend operator fun invoke(request: RecomputeEmissionsRequest): Flow<ResultState<RecomputeEmissionsResponse>> {
        return emissionsRepository.recomputeEmissions(request)
    }
}
