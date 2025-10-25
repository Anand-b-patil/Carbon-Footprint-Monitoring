package com.nutrino.carbonfootprint.domain.repository

import com.nutrino.carbonfootprint.data.remote.auth.MeResponse
import com.nutrino.carbonfootprint.data.state.ResultState
import kotlinx.coroutines.flow.Flow

interface UserRepository {
    suspend fun getMe(): Flow<ResultState<MeResponse>>
}
