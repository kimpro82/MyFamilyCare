'Option Explicit                                                            ' Cause an error : i, j are not declared strictly


Sub GenIdea()

    Range("A4:F10000").ClearContents

    Dim n, postp, pick As Integer
    n = Range("B1")
    postp = Range("B2")

    For i = 1 To n
        For j = 1 To 6
            Randomize
            pick = Int(Rnd * Sheet1.Cells(1, j)) + 1

            If postp = 1 Then
'               Cells(i + 3, j).Value = Str(pick + 2) & " " & Str(j + 7)    ' test
                Cells(i + 3, j).Value = Sheet1.Cells(pick + 2, j) & " " & Sheet1.Cells(2, j + 7)
            Else
                Cells(i + 3, j).Value = Sheet1.Cells(pick + 2, j)
            End If
        Next j
    Next i

End Sub


Private Sub btnRun_Click()

    Application.Calculation = xlManual
        Call GenIdea
    Application.Calculation = xlAutomatic

End Sub