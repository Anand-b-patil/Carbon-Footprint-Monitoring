package com.nutrino.carbonfootprint.domain.repository

import com.nutrino.carbonfootprint.data.remote.auth.SignUpRequest
import com.nutrino.carbonfootprint.data.remote.auth.SignUpResponse
import com.nutrino.carbonfootprint.data.state.ResultState
import kotlinx.coroutines.flow.Flow

interface AuthRepository {
    suspend fun signUp(signUpRequest: SignUpRequest): Flow<ResultState<SignUpResponse>>
}