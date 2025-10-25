package com.nutrino.carbonfootprint.presentation.navigation

import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.hilt.lifecycle.viewmodel.compose.hiltViewModel
import androidx.lifecycle.compose.collectAsStateWithLifecycle
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.rememberNavController
import com.nutrino.carbonfootprint.presentation.screens.OverViewScreen
import com.nutrino.carbonfootprint.presentation.screens.SignUpScreen
import com.nutrino.carbonfootprint.presentation.viewmodels.UserPreferenceViewModel

@Composable
fun MainApp(userPreferenceViewModel: UserPreferenceViewModel = hiltViewModel()) {
    val navController = rememberNavController()
    val userPrefState = userPreferenceViewModel.accessToken.collectAsStateWithLifecycle()
    NavHost(navController = navController , startDestination = if(userPrefState.value.isNullOrEmpty()){
        SIGN_UP_SCREEN
    } else{
        OVER_VIEW_SCREEN
    }){
        composable<SIGN_UP_SCREEN> {
            SignUpScreen()

        }
        composable<OVER_VIEW_SCREEN> {
            OverViewScreen(navController = navController)
        }
    }

}