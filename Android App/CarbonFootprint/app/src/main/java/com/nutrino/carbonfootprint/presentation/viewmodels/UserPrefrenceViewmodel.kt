package com.nutrino.carbonfootprint.presentation.viewmodels

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.nutrino.carbonfootprint.data.local.UserPrefrence
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.flow.combine
import kotlinx.coroutines.flow.first
import kotlinx.coroutines.launch
import javax.inject.Inject


@HiltViewModel
class UserPreferenceViewModel @Inject constructor(
    private val userPrefrence: UserPrefrence
) : ViewModel() {

    private val _isInitialized = MutableStateFlow(false)
    val isInitialized = _isInitialized.asStateFlow()

    // --- StateFlows for exposing data to UI ---
    private val _accessToken = MutableStateFlow<String?>(null)
    val accessToken = _accessToken.asStateFlow()

    init {
        viewModelScope.launch {
            // Combine all flows and wait until they emit their first value
            combine(
                userPrefrence.acessToken
            ) { _ -> } // we don't care about values, only that they emitted
                .first() // <-- waits until it emits once

            _isInitialized.value = true // ✅ only now mark ready
        }

        // Launch collectors as usual
        observeAccessToken()
    }

    // --- Collect access token flow ---
    private fun observeAccessToken() {
        viewModelScope.launch {
            userPrefrence.acessToken.collect { token ->
                _accessToken.value = token
            }
        }
    }

    // --- Update tokens ---
    fun updateAccessToken(newToken: String) {
        viewModelScope.launch(Dispatchers.IO) {
            userPrefrence.updateAcessToken(newToken)
        }
    }
}
